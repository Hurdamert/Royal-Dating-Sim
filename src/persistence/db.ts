// IndexedDB adapter. Database `royal-exceptions` v1, object store `records`
// with keys active / previous_good / gallery / draft / meta. Every committed
// change is ONE readwrite transaction; on abort nothing changes.
import { applyAction, newRun } from '../core/engine';
import { SCHEMA_VERSION, type GalleryRecord, type PlayerAction, type RefusalCode, type Route, type RunState, type JournalRecord } from '../core/model';
import { unionGallery } from './backup';
import type { EncounterDraft } from './draft';
import { SaveError, type SaveErrorCode } from './errors';

export const DB_NAME = 'royal-exceptions';
export const DB_VERSION = 1;
export const STORE = 'records';
type Key = 'active' | 'previous_good' | 'gallery' | 'draft' | 'meta';

export interface RawRecords {
  active: unknown;
  previousGood: unknown;
  gallery: unknown;
  draft: unknown;
  meta: unknown;
}

export type CommitResult =
  | { ok: true; status: 'committed'; state: RunState; record: JournalRecord; gallery: Route[] }
  | { ok: true; status: 'duplicate'; state: RunState; gallery: Route[] }
  | { ok: false; code: SaveErrorCode | RefusalCode | 'no_active_run'; error?: unknown };

/** Test-only hooks (fault injection). Never set in production code paths. */
export interface DbHooks {
  /** Called inside the commit transaction after computing, before writes; may throw or abort. */
  beforeCommitWrites?: (tx: IDBTransaction) => void;
}

function errorCodeFor(err: unknown): SaveErrorCode {
  const name = (err as { name?: string } | null)?.name;
  return name === 'QuotaExceededError' ? 'ERR_SAVE_QUOTA' : 'ERR_SAVE_TRANSACTION';
}

export function openDatabase(factory: IDBFactory | undefined = globalThis.indexedDB): Promise<SaveDb> {
  return new Promise((resolve, reject) => {
    if (!factory) return reject(new SaveError('ERR_STORAGE_UNAVAILABLE', ['indexedDB is not available']));
    let req: IDBOpenDBRequest;
    try {
      req = factory.open(DB_NAME, DB_VERSION);
    } catch (e) {
      return reject(new SaveError('ERR_STORAGE_UNAVAILABLE', [String(e)]));
    }
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE);
        store.put({ schemaVersion: SCHEMA_VERSION, createdAt: new Date().toISOString(), app: 'royal-exceptions' }, 'meta');
      }
    };
    req.onsuccess = () => resolve(new SaveDb(req.result));
    req.onerror = () => reject(new SaveError('ERR_STORAGE_UNAVAILABLE', [String(req.error)]));
    req.onblocked = () => reject(new SaveError('ERR_STORAGE_UNAVAILABLE', ['database open blocked by another connection']));
  });
}

export class SaveDb {
  hooks: DbHooks = {};
  constructor(readonly db: IDBDatabase) {
    // If another context deletes/upgrades the DB, close cleanly.
    db.onversionchange = () => db.close();
  }

  close() {
    this.db.close();
  }

  /** Read all records in one readonly transaction. Values are returned unvalidated. */
  readAll(): Promise<RawRecords> {
    return new Promise((resolve, reject) => {
      let tx: IDBTransaction;
      try {
        tx = this.db.transaction(STORE, 'readonly');
      } catch (e) {
        return reject(new SaveError('ERR_STORAGE_UNAVAILABLE', [String(e)]));
      }
      const s = tx.objectStore(STORE);
      const keys: Key[] = ['active', 'previous_good', 'gallery', 'draft', 'meta'];
      const reqs = keys.map((k) => s.get(k));
      tx.oncomplete = () =>
        resolve({
          active: reqs[0]!.result ?? null,
          previousGood: reqs[1]!.result ?? null,
          gallery: reqs[2]!.result ?? null,
          draft: reqs[3]!.result ?? null,
          meta: reqs[4]!.result ?? null,
        });
      tx.onerror = () => reject(new SaveError('ERR_STORAGE_UNAVAILABLE', [String(tx.error)]));
      tx.onabort = () => reject(new SaveError('ERR_STORAGE_UNAVAILABLE', [String(tx.error)]));
    });
  }

  /**
   * Generic single-transaction read-modify-write. `fn` runs synchronously inside
   * the transaction with the current raw values and returns writes to apply
   * (undefined value = delete) plus a result, or throws/returns abort to roll back.
   */
  private rmw<T>(
    keys: Key[],
    fn: (current: Partial<Record<Key, unknown>>, tx: IDBTransaction) => { writes: Partial<Record<Key, unknown | undefined>>; result: T } | { abort: true; result: T },
  ): Promise<{ committed: boolean; result: T }> {
    return new Promise((resolve, reject) => {
      let tx: IDBTransaction;
      try {
        tx = this.db.transaction(STORE, 'readwrite');
      } catch (e) {
        return reject(new SaveError(errorCodeFor(e), [String(e)]));
      }
      const store = tx.objectStore(STORE);
      const current: Partial<Record<Key, unknown>> = {};
      let remaining = keys.length;
      let outcome: { committed: boolean; result: T } | null = null;
      let failure: unknown = null;
      const run = () => {
        try {
          const r = fn(current, tx);
          if ('abort' in r) {
            outcome = { committed: false, result: r.result };
            tx.abort();
            return;
          }
          for (const [k, v] of Object.entries(r.writes) as [Key, unknown][]) {
            if (v === undefined) store.delete(k);
            else store.put(v, k);
          }
          outcome = { committed: true, result: r.result };
        } catch (e) {
          failure = e;
          try {
            tx.abort();
          } catch {
            /* already finished */
          }
        }
      };
      for (const k of keys) {
        const req = store.get(k);
        req.onsuccess = () => {
          current[k] = req.result ?? null;
          if (--remaining === 0) run();
        };
      }
      if (keys.length === 0) run();
      tx.oncomplete = () => {
        if (outcome) resolve(outcome);
        else reject(new SaveError('ERR_SAVE_TRANSACTION', ['transaction completed without outcome']));
      };
      tx.onabort = () => {
        if (outcome && !outcome.committed) resolve(outcome);
        else reject(new SaveError(errorCodeFor(tx.error ?? failure), [String(tx.error ?? failure)]));
      };
    });
  }

  /** Commit one cost-bearing action atomically (idempotent by actionId). */
  async commitAction(action: PlayerAction, expectedRevision: number): Promise<CommitResult> {
    try {
      const { result } = await this.rmw<CommitResult>(['active', 'gallery'], (cur, tx) => {
        const active = cur.active as RunState | null;
        const gallery = ((cur.gallery as GalleryRecord | null)?.completed ?? []) as Route[];
        if (!active) return { abort: true, result: { ok: false, code: 'no_active_run' } };
        if (active.journal.some((j) => j.actionId === action.actionId)) {
          // Already committed: a retried UI event must not award twice.
          return { abort: true, result: { ok: true, status: 'duplicate', state: active, gallery } };
        }
        if (active.saveRevision !== expectedRevision) return { abort: true, result: { ok: false, code: 'ERR_DRAFT_CONFLICT' } };
        const res = applyAction(active, action);
        if (!res.ok) return { abort: true, result: { ok: false, code: res.code } };
        const newGallery = res.state.outcome === 'won' && res.state.winnerRoute ? unionGallery(gallery, [res.state.winnerRoute]) : gallery;
        this.hooks.beforeCommitWrites?.(tx);
        const writes: Partial<Record<Key, unknown>> = { previous_good: active, active: res.state, draft: undefined };
        if (newGallery !== gallery) writes.gallery = { schemaVersion: SCHEMA_VERSION, completed: newGallery } satisfies GalleryRecord;
        return { writes, result: { ok: true, status: 'committed', state: res.state, record: res.record, gallery: newGallery } };
      });
      return result;
    } catch (e) {
      return { ok: false, code: e instanceof SaveError ? e.code : 'ERR_SAVE_TRANSACTION', error: e };
    }
  }

  /** Start a new run, replacing any active run (caller has confirmed). */
  async startNewRun(route: Route, playerName: string, runId: string): Promise<RunState> {
    const { result } = await this.rmw<RunState>(['active'], (cur) => {
      const old = cur.active as RunState | null;
      const rev = old && typeof old.saveRevision === 'number' ? old.saveRevision + 1 : 0;
      const run = newRun(route, playerName, runId, rev);
      const writes: Partial<Record<Key, unknown>> = { active: run, draft: undefined };
      if (old) writes.previous_good = old;
      return { writes, result: run };
    });
    return result;
  }

  /** Replace the active run and gallery from a validated import (caller has confirmed). */
  async importReplace(run: RunState | null, gallery: Route[], mode: 'union' | 'replace', replaceRun: boolean): Promise<{ run: RunState | null; gallery: Route[] }> {
    const { result } = await this.rmw<{ run: RunState | null; gallery: Route[] }>(['active', 'gallery'], (cur) => {
      const old = cur.active as RunState | null;
      const oldGallery = ((cur.gallery as GalleryRecord | null)?.completed ?? []) as Route[];
      const newGallery = mode === 'union' ? unionGallery(oldGallery, gallery) : unionGallery([], gallery);
      const writes: Partial<Record<Key, unknown>> = { gallery: { schemaVersion: SCHEMA_VERSION, completed: newGallery } satisfies GalleryRecord };
      let nextRun = old;
      if (replaceRun && run) {
        const base = old && typeof old.saveRevision === 'number' ? old.saveRevision : -1;
        nextRun = { ...structuredClone(run), saveRevision: Math.max(base, run.saveRevision) + 1 };
        writes.active = nextRun;
        writes.draft = undefined;
        if (old) writes.previous_good = old;
      }
      return { writes, result: { run: nextRun, gallery: newGallery } };
    });
    return result;
  }

  /** Make the validated previous-good snapshot active (caller has confirmed). */
  async restorePreviousGood(snapshot: RunState): Promise<RunState> {
    const { result } = await this.rmw<RunState>(['active'], (cur) => {
      const old = cur.active as { saveRevision?: unknown } | null;
      const oldRev = old && typeof old.saveRevision === 'number' && Number.isInteger(old.saveRevision) ? old.saveRevision : -1;
      const restored = { ...structuredClone(snapshot), saveRevision: Math.max(oldRev, snapshot.saveRevision) + 1 };
      return { writes: { active: restored, previous_good: snapshot, draft: undefined }, result: restored };
    });
    return result;
  }

  /** Delete the active run (and its rollback snapshot) but keep the ending gallery. */
  async deleteRun(): Promise<void> {
    await this.rmw<null>([], () => ({ writes: { active: undefined, previous_good: undefined, draft: undefined }, result: null }));
  }

  /** Erase everything including the gallery. */
  async eraseAll(): Promise<void> {
    await this.rmw<null>([], () => ({ writes: { active: undefined, previous_good: undefined, draft: undefined, gallery: undefined }, result: null }));
  }

  /** Drafts carry zero consequential changes, so they get their own transaction. */
  async saveDraft(draft: EncounterDraft): Promise<void> {
    await this.rmw<null>([], () => ({ writes: { draft }, result: null }));
  }

  async clearDraft(): Promise<void> {
    await this.rmw<null>([], () => ({ writes: { draft: undefined }, result: null }));
  }

  /** Test/diagnostic helper: write a raw value (used to simulate corruption). */
  async writeRawForTest(key: Key, value: unknown): Promise<void> {
    await this.rmw<null>([], () => ({ writes: { [key]: value }, result: null }));
  }
}

export function deleteDatabase(factory: IDBFactory = globalThis.indexedDB): Promise<void> {
  return new Promise((resolve, reject) => {
    const r = factory.deleteDatabase(DB_NAME);
    r.onsuccess = () => resolve();
    r.onerror = () => reject(r.error);
    r.onblocked = () => resolve();
  });
}
