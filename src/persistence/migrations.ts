// Schema migration registry (SAVE_RECOVERY_AND_FAILURES.md "Migrations").
//
// A version N adds `MIGRATIONS[N - 1]`: a PURE function from a version N-1
// document to a version N document. Backups and stored records are migrated step
// by step to SCHEMA_VERSION, then validated exactly like native current-version
// data; a document from a newer schema than this build knows is refused
// (ERR_IMPORT_VERSION), never coerced.
//
// Version 2 (2026-10-25) adds Senna's route (owner request). A version 1 run has
// no conversation cursor and no optional-event flags for her; they start at 0 and
// false, which is exactly what a version 2 game would hold for a route never
// played. Nothing else changes, so a migrated run replays its journal to the same
// state and passes validation.
import { SCHEMA_VERSION } from '../core/model';

export type Migration = (doc: Record<string, unknown>) => Record<string, unknown>;

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

/** A stored or exported run, version 1 → 2. Shapes it does not recognise are left for validation to reject. */
export function runV1toV2(run: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...run, schemaVersion: 2 };
  if (isObj(run.ordinaryNext) && !('SEN' in run.ordinaryNext)) out.ordinaryNext = { ...run.ordinaryNext, SEN: { PRE: 0, POST: 0 } };
  if (isObj(run.optionalsExperienced)) {
    const o = { ...run.optionalsExperienced };
    for (const k of ['SEN-EVT-PRE-01', 'SEN-EVT-POST-01']) if (!(k in o)) o[k] = false;
    out.optionalsExperienced = o;
  }
  return out;
}

/** Runs as stored in IndexedDB (`active`, `previous_good`). */
export const RUN_MIGRATIONS: Readonly<Record<number, Migration>> = Object.freeze({ 1: runV1toV2 });
/** The stored endings gallery record: the format did not change, only its version. */
export const GALLERY_MIGRATIONS: Readonly<Record<number, Migration>> = Object.freeze({ 1: (g: Record<string, unknown>) => ({ ...g, schemaVersion: 2 }) });
/** Exported backup documents. The digest covers the document as exported, so it is checked before migrating. */
export const MIGRATIONS: Readonly<Record<number, Migration>> = Object.freeze({
  1: (doc: Record<string, unknown>) => ({ ...doc, schemaVersion: 2, activeRun: isObj(doc.activeRun) ? runV1toV2(doc.activeRun) : doc.activeRun }),
});

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

/**
 * A record read from storage, upgraded to the current version when it is an older
 * one this build knows. Anything else (newer, malformed) is returned unchanged so
 * validation reports it and the recovery path takes over.
 */
export function migrateStored(raw: unknown, registry: Readonly<Record<number, Migration>>): unknown {
  if (!isObj(raw)) return raw;
  const m = migrateToCurrent(raw, registry);
  return m.ok ? m.doc : raw;
}
