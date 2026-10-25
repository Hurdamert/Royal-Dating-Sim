// Game session: owns storage, the writer lock and cross-tab notification, and
// exposes an immutable snapshot for the UI (useSyncExternalStore-compatible).
import type { PlayerAction, RefusalCode, Route, RunState } from '../core/model';
import { validateGalleryRecord, validateRun } from '../core/validate';
import { buildBackup, parseBackup, type ParsedBackup } from './backup';
import { openDatabase, type SaveDb, type CommitResult } from './db';
import { checkDraft, type EncounterDraft } from './draft';
import { SaveError, type SaveErrorCode } from './errors';
import { acquireWriter, locksSupported, type WriterHandle } from './lock';

export type Access = 'pending' | 'writer' | 'read_only' | 'unsupported' | 'storage_unavailable';

export interface SessionSnapshot {
  phase: 'booting' | 'ready' | 'recovery' | 'unavailable';
  access: Access;
  run: RunState | null;
  gallery: Route[];
  draft: EncounterDraft | null;
  recovery: null | { activeErrors: string[]; previousGood: RunState | null; previousGoodErrors: string[] };
  galleryWarning: string[] | null;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  lastError: { code: SaveErrorCode; details: string[] } | null;
  notice: SaveErrorCode | null;
  takeoverWaiting: boolean;
}

export interface SessionEnv {
  indexedDB?: IDBFactory;
  locks?: LockManager;
  broadcast?: typeof BroadcastChannel;
}

export type ActionOutcome =
  | { ok: true; state: RunState; duplicate: boolean }
  | { ok: false; code: SaveErrorCode | RefusalCode | 'no_active_run' | 'not_writer' };

const CHANNEL = 'royal-exceptions-saves';

const INITIAL: SessionSnapshot = {
  phase: 'booting',
  access: 'pending',
  run: null,
  gallery: [],
  draft: null,
  recovery: null,
  galleryWarning: null,
  saveStatus: 'idle',
  lastError: null,
  notice: null,
  takeoverWaiting: false,
};

export class GameSession {
  private snap: SessionSnapshot = INITIAL;
  private listeners = new Set<() => void>();
  private db: SaveDb | null = null;
  private writer: WriterHandle | null = null;
  private channel: BroadcastChannel | null = null;
  private takeoverAbort: AbortController | null = null;

  constructor(private readonly env: SessionEnv = {}) {}

  /** An explicit `locks: undefined` in env means "unsupported" (used by tests). */
  private lockManager(): LockManager | undefined {
    return 'locks' in this.env ? this.env.locks : globalThis.navigator?.locks;
  }

  // ---- observable --------------------------------------------------------
  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };
  getSnapshot = () => this.snap;
  private set(patch: Partial<SessionSnapshot>) {
    this.snap = { ...this.snap, ...patch };
    for (const l of this.listeners) l();
  }
  get database(): SaveDb | null {
    return this.db;
  }
  get writable(): boolean {
    return this.snap.access === 'writer' && this.snap.phase === 'ready';
  }

  // ---- lifecycle ---------------------------------------------------------
  async init(): Promise<void> {
    try {
      this.db = await openDatabase(this.env.indexedDB ?? globalThis.indexedDB);
    } catch (e) {
      const code = e instanceof SaveError ? e.code : 'ERR_STORAGE_UNAVAILABLE';
      this.set({ phase: 'unavailable', access: 'storage_unavailable', lastError: { code, details: e instanceof SaveError ? e.details : [String(e)] } });
      return;
    }
    const locks = this.lockManager();
    let access: Access;
    if (!locksSupported(locks)) access = 'unsupported';
    else {
      this.writer = await acquireWriter(locks, 'now');
      access = this.writer ? 'writer' : 'read_only';
    }
    const BC = this.env.broadcast ?? globalThis.BroadcastChannel;
    if (BC) {
      this.channel = new BC(CHANNEL);
      this.channel.onmessage = () => {
        if (this.snap.access !== 'writer') void this.reload();
      };
    }
    this.set({ access });
    await this.reload();
  }

  dispose() {
    this.takeoverAbort?.abort();
    this.writer?.release();
    this.writer = null;
    this.channel?.close();
    this.db?.close();
  }

  /** Re-read committed state from storage and re-validate everything. */
  async reload(): Promise<void> {
    if (!this.db) return;
    let raw;
    try {
      raw = await this.db.readAll();
    } catch (e) {
      this.set({ phase: 'unavailable', lastError: { code: 'ERR_STORAGE_UNAVAILABLE', details: [String(e)] } });
      return;
    }
    let gallery: Route[] = [];
    let galleryWarning: string[] | null = null;
    if (raw.gallery !== null) {
      const g = validateGalleryRecord(raw.gallery);
      if (g.ok) gallery = g.value.completed;
      else galleryWarning = g.errors;
    }
    let run: RunState | null = null;
    if (raw.active !== null) {
      const v = validateRun(raw.active);
      if (!v.ok) {
        let previousGood: RunState | null = null;
        let previousGoodErrors: string[] = [];
        if (raw.previousGood !== null) {
          const p = validateRun(raw.previousGood);
          if (p.ok) previousGood = p.value;
          else previousGoodErrors = p.errors;
        } else previousGoodErrors = ['no previous snapshot exists'];
        this.set({ phase: 'recovery', run: null, gallery, galleryWarning, draft: null, recovery: { activeErrors: v.errors, previousGood, previousGoodErrors } });
        return;
      }
      run = v.value;
    }
    let draft: EncounterDraft | null = null;
    let notice: SaveErrorCode | null = this.snap.notice;
    if (raw.draft !== null) {
      const c = checkDraft(raw.draft, run);
      if (c.status === 'resumable') draft = raw.draft as EncounterDraft;
      else if (this.snap.access === 'writer') {
        await this.db.clearDraft().catch(() => undefined);
        if (c.reason === 'revision' || c.reason === 'unavailable') notice = 'ERR_DRAFT_CONFLICT';
      }
    }
    this.set({ phase: 'ready', run, gallery, galleryWarning, draft, recovery: null, notice });
  }

  clearNotice() {
    this.set({ notice: null, lastError: null });
  }

  private announce() {
    try {
      this.channel?.postMessage({ type: 'changed' });
    } catch {
      /* channel closed */
    }
  }

  private requireWriter(): SaveDb | null {
    if (this.snap.access !== 'writer' || !this.db) return null;
    return this.db;
  }

  // ---- gameplay ----------------------------------------------------------
  async commit(action: PlayerAction): Promise<ActionOutcome> {
    const db = this.requireWriter();
    const run = this.snap.run;
    if (!db || this.snap.phase !== 'ready') return { ok: false, code: 'not_writer' };
    if (!run) return { ok: false, code: 'no_active_run' };
    this.set({ saveStatus: 'saving', lastError: null });
    const r: CommitResult = await db.commitAction(action, run.saveRevision);
    if (r.ok) {
      this.set({ run: r.state, gallery: r.gallery, draft: null, saveStatus: 'saved' });
      this.announce();
      return { ok: true, state: r.state, duplicate: r.status === 'duplicate' };
    }
    if (r.code === 'ERR_DRAFT_CONFLICT') {
      this.set({ saveStatus: 'saved', notice: 'ERR_DRAFT_CONFLICT' });
      await this.reload();
      return { ok: false, code: r.code };
    }
    if (r.code === 'ERR_SAVE_TRANSACTION' || r.code === 'ERR_SAVE_QUOTA' || r.code === 'ERR_STORAGE_UNAVAILABLE') {
      this.set({ saveStatus: 'error', lastError: { code: r.code, details: [String(r.error ?? '')] } });
      return { ok: false, code: r.code };
    }
    this.set({ saveStatus: 'saved' });
    return { ok: false, code: r.code };
  }

  async saveDraft(draft: EncounterDraft): Promise<boolean> {
    const db = this.requireWriter();
    if (!db) return false;
    try {
      await db.saveDraft(draft);
      this.set({ draft });
      return true;
    } catch (e) {
      this.set({ lastError: { code: 'ERR_SAVE_TRANSACTION', details: [String(e)] } });
      return false;
    }
  }

  async discardDraft(): Promise<void> {
    const db = this.requireWriter();
    if (!db) return;
    try {
      await db.clearDraft();
    } finally {
      this.set({ draft: null });
    }
  }

  async startNewRun(route: Route, playerName: string): Promise<RunState | null> {
    const db = this.requireWriter();
    if (!db) return null;
    try {
      const run = await db.startNewRun(route, playerName, globalThis.crypto.randomUUID());
      this.set({ run, draft: null, phase: 'ready', recovery: null, saveStatus: 'saved' });
      this.announce();
      return run;
    } catch (e) {
      this.set({ saveStatus: 'error', lastError: { code: e instanceof SaveError ? e.code : 'ERR_SAVE_TRANSACTION', details: [String(e)] } });
      return null;
    }
  }

  // ---- backup ------------------------------------------------------------
  /** Export only fully committed data, read back from storage. */
  async exportBackup(now = new Date()): Promise<string> {
    if (!this.db) throw new SaveError('ERR_STORAGE_UNAVAILABLE');
    const raw = await this.db.readAll();
    const v = raw.active === null ? null : validateRun(raw.active);
    const run = v && v.ok ? v.value : null;
    const g = raw.gallery === null ? null : validateGalleryRecord(raw.gallery);
    return buildBackup(run, g && g.ok ? g.value.completed : []);
  }

  previewImport(text: string): Promise<ParsedBackup> {
    return parseBackup(text);
  }

  async confirmImport(parsed: Extract<ParsedBackup, { ok: true }>, opts: { replaceRun: boolean; galleryMode: 'union' | 'replace' }): Promise<boolean> {
    const db = this.requireWriter();
    if (!db) return false;
    try {
      const r = await db.importReplace(parsed.activeRun, parsed.completedGallery, opts.galleryMode, opts.replaceRun);
      this.announce();
      await this.reload();
      return !!r;
    } catch (e) {
      this.set({ lastError: { code: e instanceof SaveError ? e.code : 'ERR_SAVE_TRANSACTION', details: [String(e)] } });
      return false;
    }
  }

  // ---- recovery & maintenance --------------------------------------------
  async restorePreviousGood(): Promise<boolean> {
    const db = this.requireWriter();
    const snap = this.snap.recovery?.previousGood;
    if (!db || !snap) return false;
    await db.restorePreviousGood(snap);
    this.announce();
    await this.reload();
    return true;
  }

  async deleteRun(): Promise<void> {
    const db = this.requireWriter();
    if (!db) return;
    await db.deleteRun();
    this.announce();
    await this.reload();
  }

  async eraseAll(): Promise<void> {
    const db = this.requireWriter();
    if (!db) return;
    await db.eraseAll();
    this.announce();
    await this.reload();
  }

  /** Wait for the other tab to release the writer lock, then reload newest state. */
  async requestTakeover(): Promise<void> {
    const locks = this.lockManager();
    if (!locksSupported(locks) || this.snap.access === 'writer' || this.snap.takeoverWaiting) return;
    this.takeoverAbort = new AbortController();
    this.set({ takeoverWaiting: true });
    try {
      this.writer = await acquireWriter(locks, 'wait', this.takeoverAbort.signal);
      if (this.writer) {
        this.set({ access: 'writer', takeoverWaiting: false });
        await this.reload();
      }
    } catch {
      this.set({ takeoverWaiting: false });
    }
  }

  cancelTakeover() {
    this.takeoverAbort?.abort();
    this.set({ takeoverWaiting: false });
  }
}
