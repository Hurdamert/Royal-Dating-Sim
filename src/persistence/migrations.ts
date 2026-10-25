// Schema migration registry (SAVE_RECOVERY_AND_FAILURES.md "Migrations").
//
// Only schema version 1 exists. A future version N adds `MIGRATIONS[N - 1]`: a
// PURE function from a version N-1 backup document to a version N document.
// Imports and stored records are migrated step by step to SCHEMA_VERSION, then
// validated exactly like native current-version data; a document from a newer
// schema than this build knows is rejected (ERR_IMPORT_VERSION), never coerced.
import { SCHEMA_VERSION } from '../core/model';

export type Migration = (doc: Record<string, unknown>) => Record<string, unknown>;

/** MIGRATIONS[n] upgrades a version-n document to version n+1. */
export const MIGRATIONS: Readonly<Record<number, Migration>> = Object.freeze({});

export type MigrationResult = { ok: true; doc: Record<string, unknown>; from: number } | { ok: false; reason: 'future' | 'unsupported' | 'invalid'; version: unknown };

export function migrateToCurrent(doc: Record<string, unknown>, registry: Readonly<Record<number, Migration>> = MIGRATIONS, current: number = SCHEMA_VERSION): MigrationResult {
  const v = doc.schemaVersion;
  if (typeof v !== 'number' || !Number.isInteger(v) || v < 1) return { ok: false, reason: 'invalid', version: v };
  if (v > current) return { ok: false, reason: 'future', version: v };
  let out = doc;
  for (let n = v; n < current; n++) {
    const step = registry[n];
    if (!step) return { ok: false, reason: 'unsupported', version: v };
    out = step(structuredClone(out));
    if (out.schemaVersion !== n + 1) return { ok: false, reason: 'invalid', version: out.schemaVersion };
  }
  return { ok: true, doc: out, from: v };
}
