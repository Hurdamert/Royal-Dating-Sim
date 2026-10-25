// Music on/off, shown wherever music can play (title screens and the prologue)
// and in Options. A toggle button: its name stays "Music"; aria-pressed carries
// the state, and the visible on/off word is for sighted players.
import { useSyncExternalStore } from 'react';
import { music } from '../../audio/music';

export function MusicToggle({ hint = false }: { hint?: boolean }) {
  const s = useSyncExternalStore(music.subscribe, music.getState);
  return (
    <>
      {hint && s.status === 'waiting' && (
        <span className="music-hint" data-testid="music-hint">
          Music starts when you click or press a key.
        </span>
      )}
      <button
        type="button"
        className={`btn btn--small music-toggle${s.enabled ? ' music-toggle--on' : ''}`}
        aria-pressed={s.enabled}
        onClick={() => music.setEnabled(!s.enabled)}
        data-testid="music-toggle"
        data-status={s.status}
      >
        <span aria-hidden="true" className="music-toggle__icon">
          ♪
        </span>
        Music
        <span aria-hidden="true" className="music-toggle__state">
          {s.enabled ? 'on' : 'off'}
        </span>
      </button>
    </>
  );
}
