// JSON backup export/import (SAVE_RECOVERY_AND_FAILURES.md "Export"/"Import").
import { SCHEMA_VERSION, type Route, type RunState } from '../core/model';
import { runGalleryConsistent, sortRoutes, validateGallery, validateRun } from '../core/validate';
import { migrateToCurrent } from './migrations';
import { canonicalJson, sha256Hex } from './canonical';
import type { SaveErrorCode } from './errors';

export const BACKUP_FORMAT = 'royal-exceptions-save';
export const MAX_IMPORT_BYTES = 5 * 1024 * 1024;
export const MAX_DEPTH = 32;
const FORBIDDEN_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
const TOP_KEYS = new Set(['format', 'schemaVersion', 'exportedAt', 'activeRun', 'completedGallery', 'integrity']);

export interface BackupEnvelope {
  format: typeof BACKUP_FORMAT;
  schemaVersion: typeof SCHEMA_VERSION;
  exportedAt: string;
  activeRun: RunState | null;
  completedGallery: Route[];
  integrity: { algorithm: 'SHA-256'; digest: string };
}

export async function backupDigest(activeRun: RunState | null, completedGallery: Route[]): Promise<string> {
  return sha256Hex(canonicalJson({ format: BACKUP_FORMAT, schemaVersion: SCHEMA_VERSION, activeRun, completedGallery }));
}

/** Build the pretty-printed export document from committed data only. */
export async function buildBackup(activeRun: RunState | null, completedGallery: Route[], now: Date = new Date()): Promise<string> {
  const gallery = sortRoutes(completedGallery);
  const env: BackupEnvelope = {
    format: BACKUP_FORMAT,
    schemaVersion: SCHEMA_VERSION,
    exportedAt: now.toISOString(),
    activeRun,
    completedGallery: gallery,
    integrity: { algorithm: 'SHA-256', digest: await backupDigest(activeRun, gallery) },
  };
  return JSON.stringify(env, null, 2) + '\n';
}

export type ParsedBackup =
  | { ok: true; activeRun: RunState | null; completedGallery: Route[]; exportedAt: string | null }
  | { ok: false; code: SaveErrorCode; details: string[] };

function scan(v: unknown, depth: number, errs: string[]): void {
  if (errs.length) return;
  if (depth > MAX_DEPTH) {
    errs.push(`nesting deeper than ${MAX_DEPTH}`);
    return;
  }
  if (typeof v === 'number' && !Number.isFinite(v)) errs.push('non-finite number');
  else if (Array.isArray(v)) for (const x of v) scan(x, depth + 1, errs);
  else if (v && typeof v === 'object') {
    for (const k of Object.keys(v)) {
      if (FORBIDDEN_KEYS.has(k)) {
        errs.push(`forbidden key "${k}"`);
        return;
      }
      scan((v as Record<string, unknown>)[k], depth + 1, errs);
    }
  }
}

/** Parse and fully validate a backup. Never touches storage. */
export async function parseBackup(text: string): Promise<ParsedBackup> {
  const bytes = new TextEncoder().encode(text).length;
  if (bytes > MAX_IMPORT_BYTES) return { ok: false, code: 'ERR_IMPORT_FORMAT', details: ['file is larger than 5 MiB'] };
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, code: 'ERR_IMPORT_FORMAT', details: ['not valid JSON'] };
  }
  const scanErrs: string[] = [];
  scan(data, 0, scanErrs);
  if (scanErrs.length) return { ok: false, code: 'ERR_IMPORT_FORMAT', details: scanErrs };
  if (!data || typeof data !== 'object' || Array.isArray(data)) return { ok: false, code: 'ERR_IMPORT_FORMAT', details: ['top level must be an object'] };
  const d = data as Record<string, unknown>;
  const unknown = Object.keys(d).filter((k) => !TOP_KEYS.has(k));
  if (unknown.length) return { ok: false, code: 'ERR_IMPORT_FORMAT', details: [`unknown top-level field(s): ${unknown.join(', ')}`] };
  if (d.format !== BACKUP_FORMAT) return { ok: false, code: 'ERR_IMPORT_FORMAT', details: ['format is not royal-exceptions-save'] };
  if (typeof d.schemaVersion !== 'number' || !Number.isInteger(d.schemaVersion)) return { ok: false, code: 'ERR_IMPORT_FORMAT', details: ['schemaVersion missing'] };
  // Older documents are upgraded through the pure migration registry; newer ones are refused.
  const migrated = migrateToCurrent(d);
  if (!migrated.ok)
    return { ok: false, code: 'ERR_IMPORT_VERSION', details: [`schemaVersion ${String(d.schemaVersion)} is not supported (this version reads ${SCHEMA_VERSION}${migrated.reason === 'future' ? '; the backup is from a newer version of the game' : ''})`] };
  if (d.exportedAt !== undefined && (typeof d.exportedAt !== 'string' || Number.isNaN(Date.parse(d.exportedAt))))
    return { ok: false, code: 'ERR_IMPORT_FORMAT', details: ['exportedAt is not a timestamp'] };
  if (!('activeRun' in d) || !('completedGallery' in d)) return { ok: false, code: 'ERR_IMPORT_FORMAT', details: ['activeRun and completedGallery are required'] };
  const integ = d.integrity as Record<string, unknown> | undefined;
  if (!integ || typeof integ !== 'object' || integ.algorithm !== 'SHA-256' || typeof integ.digest !== 'string' || !/^[0-9a-f]{64}$/.test(integ.digest) || Object.keys(integ).length !== 2)
    return { ok: false, code: 'ERR_IMPORT_FORMAT', details: ['integrity block missing or malformed'] };
  let digest: string;
  try {
    digest = await sha256Hex(canonicalJson({ format: d.format, schemaVersion: d.schemaVersion, activeRun: d.activeRun, completedGallery: d.completedGallery }));
  } catch {
    return { ok: false, code: 'ERR_IMPORT_FORMAT', details: ['content cannot be canonicalized'] };
  }
  if (digest !== integ.digest) return { ok: false, code: 'ERR_IMPORT_DIGEST', details: ['SHA-256 digest does not match'] };

  // The digest covers the document as exported; validation applies to the migrated form.
  const cur = migrated.doc;
  const g = validateGallery(cur.completedGallery);
  if (!g.ok) return { ok: false, code: 'ERR_IMPORT_STATE', details: g.errors };
  let run: RunState | null = null;
  if (cur.activeRun !== null) {
    const r = validateRun(cur.activeRun);
    if (!r.ok) return { ok: false, code: 'ERR_IMPORT_STATE', details: r.errors };
    run = r.value;
  }
  const c = runGalleryConsistent(run, g.value);
  if (c.length) return { ok: false, code: 'ERR_IMPORT_STATE', details: c };
  return { ok: true, activeRun: run, completedGallery: g.value, exportedAt: (d.exportedAt as string | undefined) ?? null };
}

export function unionGallery(a: Route[], b: Route[]): Route[] {
  return sortRoutes([...new Set([...a, ...b])]);
}
