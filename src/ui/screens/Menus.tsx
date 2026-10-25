// Title, new-run setup, gallery, credits/licenses and the storage-unavailable screen.
import { useState } from 'react';
import { ROUTES, type Route, type RunState } from '../../core/model';
import { normalizePlayerName, graphemeCount } from '../../core/engine';
import { CONTENT, getScene, sceneIds, supportString } from '../../core/content';
import type { SessionSnapshot } from '../../persistence/session';
import { ERROR_TEXT } from '../../persistence/errors';
import { Confirm } from '../components/Modal';
import { art, displayTitle, heartsText, ROUTE_NAME, ROUTE_TAGLINE, SLOT_NAME } from '../labels';

export function Title({
  snap,
  onNew,
  onContinue,
  onResume,
  onGallery,
  onImport,
  onOptions,
  onCredits,
  onHelp,
}: {
  snap: SessionSnapshot;
  onNew: () => void;
  onContinue: () => void;
  onResume: () => void;
  onGallery: () => void;
  onImport: () => void;
  onOptions: () => void;
  onCredits: () => void;
  onHelp: () => void;
}) {
  const run = snap.run;
  return (
    <main className="title-screen" data-testid="title">
      <div className="title-screen__inner panel">
        <h1 className="wordmark">Royal Exceptions</h1>
        <p className="lede">{supportString('UI-INTRO-01')}</p>
        {snap.access !== 'writer' && <AccessBanner snap={snap} />}
        <div className="menu">
          {snap.draft && run && (
            <button type="button" className="btn btn--primary" onClick={onResume} data-testid="resume">
              Resume conversation with {ROUTE_NAME[run.route]}
            </button>
          )}
          {run && (
            <button type="button" className={`btn${snap.draft ? '' : ' btn--primary'}`} onClick={onContinue} data-testid="continue-run">
              {run.outcome === 'active' ? `Continue — ${ROUTE_NAME[run.route]}, Day ${run.day} ${SLOT_NAME[run.slot].toLowerCase()}, ${heartsText(run.heartsHalf)} hearts` : run.outcome === 'won' ? `Review finished run — ${ROUTE_NAME[run.route]} (married)` : `Review ended run — ${ROUTE_NAME[run.route]} (deadline passed)`}
            </button>
          )}
          <button type="button" className={`btn${run ? '' : ' btn--primary'}`} onClick={onNew} disabled={snap.access !== 'writer'} data-testid="new-run">
            New run
          </button>
          <button type="button" className="btn" onClick={onGallery}>
            Endings gallery ({snap.gallery.length}/3)
          </button>
          <button type="button" className="btn" onClick={onImport}>
            Import / export backup
          </button>
          <button type="button" className="btn" onClick={onHelp}>
            How to play
          </button>
          <button type="button" className="btn" onClick={onOptions}>
            Options
          </button>
          <button type="button" className="btn" onClick={onCredits}>
            Credits &amp; licenses
          </button>
        </div>
      </div>
    </main>
  );
}

export function AccessBanner({ snap, onTakeover }: { snap: SessionSnapshot; onTakeover?: () => void }) {
  const code = snap.access === 'read_only' ? 'ERR_LOCK_READ_ONLY' : snap.access === 'unsupported' ? 'ERR_LOCK_UNSUPPORTED' : snap.access === 'storage_unavailable' ? 'ERR_STORAGE_UNAVAILABLE' : null;
  if (!code) return null;
  const t = ERROR_TEXT[code];
  return (
    <div className="banner banner--warn" role="alert" data-testid="access-banner">
      <strong>{t.title}.</strong> {t.body}
      {snap.access === 'read_only' && onTakeover && (
        <div className="row">
          <button type="button" className="btn btn--small" onClick={onTakeover} disabled={snap.takeoverWaiting}>
            {snap.takeoverWaiting ? 'Waiting for the other tab to close…' : 'Take over when the other tab closes'}
          </button>
        </div>
      )}
    </div>
  );
}

export function NewRun({
  existing,
  replacingDamaged,
  onStart,
  onCancel,
  onExport,
}: {
  existing: RunState | null;
  /** Set when starting from the recovery screen: the damaged save will be replaced. */
  replacingDamaged?: { previousGood: RunState | null };
  onStart: (route: Route, name: string) => void;
  onCancel: () => void;
  onExport: () => void;
}) {
  const [route, setRoute] = useState<Route | null>(null);
  const [name, setName] = useState('');
  const [confirm, setConfirm] = useState(false);
  const norm = normalizePlayerName(name);
  const count = graphemeCount(name.normalize('NFC').trim());
  const start = () => {
    if (!route || !norm.ok) return;
    if (existing || replacingDamaged) setConfirm(true);
    else onStart(route, norm.name);
  };
  return (
    <main className="newrun panel" data-testid="new-run-screen">
      <h1>New run</h1>
      <p className="lede">{supportString('UI-INTRO-02')}</p>
      <fieldset className="routes">
        <legend>Choose a princess</legend>
        {ROUTES.map((r) => (
          <div key={r} className={`route-card route-card--${r.toLowerCase()}${route === r ? ' is-selected' : ''}`}>
            <label>
              <input type="radio" name="route" value={r} checked={route === r} onChange={() => setRoute(r)} data-route={r} aria-describedby={`tagline-${r}`} />
              <img src={art.sprite(r, 'NEUTRAL')} alt="" className={`route-card__img portrait portrait--${r.toLowerCase()}`} loading="lazy" />
              <span className="route-card__text">
                <span className="route-card__name">{ROUTE_NAME[r]}</span>
                <span className="route-card__tagline" id={`tagline-${r}`}>
                  {ROUTE_TAGLINE[r]}
                </span>
              </span>
            </label>
          </div>
        ))}
      </fieldset>
      <div className="field">
        <label htmlFor="player-name">Your name (optional)</label>
        <input
          id="player-name"
          type="text"
          value={name}
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => setName(e.target.value)}
          aria-describedby="name-help"
          aria-invalid={!norm.ok}
          data-testid="name-input"
        />
        <p id="name-help" className={`small ${norm.ok ? 'muted' : 'error'}`}>
          {norm.ok ? `${count}/24 characters. Leave empty to be called “${supportString('TXT-NAME-FALLBACK')}”.` : norm.reason === 'too_long' ? `Too long: ${count}/24 characters.` : 'Please remove control characters.'}
        </p>
      </div>
      <ul className="intro-list">
        {['UI-INTRO-03', 'UI-INTRO-04', 'UI-INTRO-05', 'UI-INTRO-06'].map((k) => (
          <li key={k}>{supportString(k)}</li>
        ))}
      </ul>
      <div className="row">
        <button type="button" className="btn" onClick={onCancel}>
          Back
        </button>
        <button type="button" className="btn btn--primary" disabled={!route || !norm.ok} onClick={start} data-testid="begin">
          {route ? `Begin ${ROUTE_NAME[route]}’s route` : 'Choose a princess to begin'}
        </button>
      </div>
      {confirm && route && norm.ok && (
        <Confirm
          title={replacingDamaged ? 'Replace the damaged save?' : 'Replace the current run?'}
          confirmLabel="Replace and begin"
          danger
          onCancel={() => setConfirm(false)}
          onConfirm={() => onStart(route, norm.name)}
        >
          {replacingDamaged ? (
            <>
              <p>The damaged save will be replaced by a new run. Your endings gallery is kept.</p>
              {replacingDamaged.previousGood ? (
                <p className="muted">
                  The earlier snapshot ({ROUTE_NAME[replacingDamaged.previousGood.route]}, Day {replacingDamaged.previousGood.day}) stays as the rollback snapshot until your first action in the new run. To keep it for good, download it first.
                </p>
              ) : (
                <p className="muted">There is no usable earlier snapshot to keep.</p>
              )}
              {replacingDamaged.previousGood && (
                <button type="button" className="btn btn--small" onClick={onExport}>
                  Download the earlier snapshot first
                </button>
              )}
            </>
          ) : (
            <>
              <p>{supportString('UI-CONFIRM-01')}</p>
              {existing && (
                <p className="muted">
                  Current run: {ROUTE_NAME[existing.route]}, Day {existing.day}, {heartsText(existing.heartsHalf)} hearts ({existing.outcome}). Your endings gallery is kept.
                </p>
              )}
              <button type="button" className="btn btn--small" onClick={onExport}>
                {supportString('UI-SAVE-02')} first
              </button>
            </>
          )}
        </Confirm>
      )}
    </main>
  );
}

export function Gallery({ gallery, onReplay, onBack }: { gallery: Route[]; onReplay: (r: Route, which: 'epilogue' | 'prologue') => void; onBack: () => void }) {
  return (
    <main className="gallery panel" data-testid="gallery">
      <h1>Endings gallery</h1>
      <p className="muted">Endings you have reached stay unlocked across runs, failures and imports. Replays are read-only and use no time.</p>
      <ul className="gallery__list">
        {ROUTES.map((r) => {
          const unlocked = gallery.includes(r);
          const epi = getScene(sceneIds.epilogue(r))!;
          return (
            <li key={r} className={`gallery__item${unlocked ? '' : ' is-locked'}`} data-route={r} data-unlocked={unlocked}>
              <img src={art.sprite(r, unlocked ? 'PLAYFUL' : 'NEUTRAL')} alt="" className={`gallery__img portrait portrait--${r.toLowerCase()}`} loading="lazy" />
              <div>
                <h2>{ROUTE_NAME[r]}</h2>
                {unlocked ? (
                  <>
                    <p>{displayTitle(epi.title)}</p>
                    <div className="row">
                      <button type="button" className="btn btn--small btn--primary" onClick={() => onReplay(r, 'epilogue')}>
                        Replay ending
                      </button>
                      <button type="button" className="btn btn--small" onClick={() => onReplay(r, 'prologue')}>
                        Replay prologue
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="muted">Locked. Marry {ROUTE_NAME[r]} to unlock.</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <button type="button" className="btn" onClick={onBack}>
        Back
      </button>
    </main>
  );
}

export function Credits({ onBack }: { onBack: () => void }) {
  const fontsLoaded = typeof document !== 'undefined' && document.fonts?.check?.('16px "Source Sans 3"') && document.fonts?.check?.('16px "Cormorant Garamond"');
  return (
    <main className="credits panel" data-testid="credits">
      <h1>Credits &amp; licenses</h1>
      <h2>Story and art</h2>
      <p>
        All story text, characters and illustrations are original project content for <em>Royal Exceptions</em>, approved by the project owner. At the owner’s request
        the character art ships in an all-ages edit of the approved originals, and two pivotal-moment illustrations (Tavri’s <em>Private Confession</em>, Nerelle’s{' '}
        <em>Forbidden Journey</em>) were redrawn in seated poses with an AI image editor (FLUX.1 Kontext [dev], Black Forest Labs), using the approved art as the
        reference. No stock imagery or generated runtime text is used.
        {` ${CONTENT.scenes ? Object.keys(CONTENT.scenes).length : 0} authored scenes are included.`}
      </p>
      <h2>Fonts</h2>
      <p>
        Typography uses <strong>Cormorant Garamond</strong> (Christian Thalmann, Catharsis Fonts) and <strong>Source Sans 3</strong> (Adobe), both under the SIL Open Font
        License 1.1. Font files are fetched from their official open-source distribution at build time and their license texts are shipped with the site
        {fontsLoaded ? '.' : '. If they are not present, your system’s fallback fonts are used.'}
      </p>
      <p>
        <a href="/fonts/OFL-CormorantGaramond.txt">Cormorant Garamond license (OFL)</a> · <a href="/fonts/OFL-SourceSans3.txt">Source Sans 3 license (OFL)</a>
      </p>
      <h2>Software</h2>
      <p>
        Built with React and React DOM (MIT License, © Meta Platforms, Inc. and affiliates) and the Scheduler package (MIT). Full notices:{' '}
        <a href="/licenses/THIRD_PARTY_NOTICES.txt">third-party notices</a>.
      </p>
      <h2>Music</h2>
      <p>
        Title music (opening and loop) and <em>Enter the Town</em> were supplied by the project owner. Music plays on the title screens and during the prologue; switch it
        off with the Music button or in Options.
      </p>
      <h2>Privacy</h2>
      <p>The game talks to no other website, has no accounts and no analytics, and stores progress only in this browser.</p>
      <button type="button" className="btn" onClick={onBack}>
        Back
      </button>
    </main>
  );
}

export function StorageUnavailable({ snap }: { snap: SessionSnapshot }) {
  const t = ERROR_TEXT[snap.lastError?.code ?? 'ERR_STORAGE_UNAVAILABLE'];
  return (
    <main className="panel" role="alert" data-testid="storage-unavailable">
      <h1>{t.title}</h1>
      <p>{t.body}</p>
    </main>
  );
}
