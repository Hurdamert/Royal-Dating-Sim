// Named persistence errors (SAVE_RECOVERY_AND_FAILURES.md). The user-facing
// text is implementation-authored technical copy, not narrative content.
export type SaveErrorCode =
  | 'ERR_STORAGE_UNAVAILABLE'
  | 'ERR_LOCK_READ_ONLY'
  | 'ERR_LOCK_UNSUPPORTED'
  | 'ERR_SAVE_TRANSACTION'
  | 'ERR_SAVE_QUOTA'
  | 'ERR_DRAFT_CONFLICT'
  | 'ERR_IMPORT_FORMAT'
  | 'ERR_IMPORT_DIGEST'
  | 'ERR_IMPORT_VERSION'
  | 'ERR_IMPORT_STATE'
  | 'ERR_IMPORT_CANCELED'
  | 'ERR_ASSET_LOAD'
  | 'ERR_CONTENT_MISSING';

export const ERROR_TEXT: Record<SaveErrorCode, { title: string; body: string }> = {
  ERR_STORAGE_UNAVAILABLE: {
    title: 'Progress cannot be saved in this browser',
    body: 'Browser storage (IndexedDB) is unavailable, for example in some private windows or when site data is blocked. Gameplay that would need saving is turned off. Allow site storage or use a regular window, then reload.',
  },
  ERR_LOCK_READ_ONLY: {
    title: 'Read-only: the game is open in another tab',
    body: 'Another tab owns this save, so this tab can only view it. Close the other tab, then choose "Take over" here. This tab will load the newest saved progress before allowing play.',
  },
  ERR_LOCK_UNSUPPORTED: {
    title: 'Read-only: this browser cannot protect the save',
    body: 'This browser lacks the Web Locks feature needed to stop two tabs from overwriting each other, so play is turned off rather than risk losing progress. Use a current version of Chrome, Edge, Firefox or Safari.',
  },
  ERR_SAVE_TRANSACTION: {
    title: 'That action was not saved',
    body: 'Saving failed, so no time passed and nothing was awarded. Your previous progress is unchanged. You can try the same action again.',
  },
  ERR_SAVE_QUOTA: {
    title: 'Browser storage is full',
    body: 'The action was not saved and your existing progress is unchanged. Free some browser storage for this site, or export a backup of your last saved progress.',
  },
  ERR_DRAFT_CONFLICT: {
    title: 'The unfinished conversation was out of date',
    body: 'Saved progress changed after that conversation began, so it was set aside without any cost or reward. You are looking at the newest saved progress.',
  },
  ERR_IMPORT_FORMAT: {
    title: 'That file is not a usable Royal Exceptions backup',
    body: 'The file could not be read as a backup (wrong format, too large, too deeply nested, or containing unsupported fields). Your current progress has not been changed.',
  },
  ERR_IMPORT_DIGEST: {
    title: 'That backup failed its integrity check',
    body: 'The backup’s contents do not match its recorded checksum, so it may have been edited or damaged. It was rejected and your current progress has not been changed.',
  },
  ERR_IMPORT_VERSION: {
    title: 'That backup is from an unsupported version',
    body: 'This version of the game reads save format version 1 only. The backup was rejected and your current progress has not been changed.',
  },
  ERR_IMPORT_STATE: {
    title: 'That backup describes an impossible game state',
    body: 'The backup’s progress is inconsistent with the game’s rules, so it was rejected. Your current progress has not been changed.',
  },
  ERR_IMPORT_CANCELED: {
    title: 'Import canceled',
    body: 'Nothing was changed.',
  },
  ERR_ASSET_LOAD: {
    title: 'An image could not be loaded',
    body: 'A game image failed to load. A text label is shown in its place.',
  },
  ERR_CONTENT_MISSING: {
    title: 'This story scene is unavailable',
    body: 'A required story scene could not be found, so the encounter was not started. No time passed and your progress is unchanged.',
  },
};

export class SaveError extends Error {
  constructor(
    readonly code: SaveErrorCode,
    readonly details: string[] = [],
  ) {
    super(code);
  }
}
