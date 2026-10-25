// Single-writer ownership via the Web Locks API. The writable tab holds the
// exclusive lock `royal-exceptions-writer` for its whole lifetime.
export const WRITER_LOCK = 'royal-exceptions-writer';

export interface WriterHandle {
  release(): void;
}

// No default parameter: an explicit `undefined` must mean "unsupported".
export function locksSupported(locks: LockManager | undefined): locks is LockManager {
  return !!locks && typeof locks.request === 'function';
}

/**
 * Try to become the writer. mode 'now' returns null immediately if another tab
 * holds the lock; mode 'wait' resolves once the lock is granted (or rejects if
 * the signal aborts).
 */
export function acquireWriter(locks: LockManager, mode: 'now' | 'wait', signal?: AbortSignal): Promise<WriterHandle | null> {
  return new Promise((resolve, reject) => {
    let release!: () => void;
    const held = new Promise<void>((r) => (release = r));
    const opts: LockOptions = mode === 'now' ? { mode: 'exclusive', ifAvailable: true } : { mode: 'exclusive', ...(signal ? { signal } : {}) };
    locks
      .request(WRITER_LOCK, opts, async (lock) => {
        if (!lock) {
          resolve(null);
          return;
        }
        resolve({ release: () => release() });
        await held;
      })
      .catch(reject);
  });
}
