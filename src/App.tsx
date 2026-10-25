import { useCallback, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import type { EncounterKind, LocationId, Route } from './core/model';
import { sceneIds } from './core/content';
import type { EncounterOffer } from './core/engine';
import type { GameSession } from './persistence/session';
import type { EncounterDraft } from './persistence/draft';
import { ERROR_TEXT } from './persistence/errors';
import { Hud } from './ui/components/Hud';
import { Hub } from './ui/screens/Hub';
import { EncounterPlayer, type EncounterExit } from './ui/screens/EncounterPlayer';
import { Presentation } from './ui/screens/Presentation';
import { AccessBanner, Credits, Gallery, NewRun, StorageUnavailable, Title } from './ui/screens/Menus';
import { CalendarPanel, Ended, HelpPanel, JournalPanel, OptionsPanel, Recovery, SavePanel, exportBackupFile } from './ui/screens/Panels';

type Screen =
  | { k: 'title' }
  | { k: 'newRun' }
  | { k: 'hub' }
  | { k: 'encounter'; encounter: EncounterKind; sceneId: string; location: LocationId; resume: EncounterDraft | null; nonce: string }
  | { k: 'present'; sceneId: string; route: Route | null; location: LocationId; replay: boolean; then: Screen; doneLabel: string }
  | { k: 'ended' }
  | { k: 'gallery' }
  | { k: 'credits' };
type Panel = 'calendar' | 'journal' | 'help' | 'save' | 'options' | null;

const MOTION_KEY = 'royal-exceptions:reduced-motion';

function readMotionPref(): boolean {
  try {
    return localStorage.getItem(MOTION_KEY) === '1';
  } catch {
    return false;
  }
}

export function App({ session }: { session: GameSession }) {
  const snap = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const [screen, setScreen] = useState<Screen>({ k: 'title' });
  const [panel, setPanel] = useState<Panel>(null);
  const [location, setLocation] = useState<LocationId>('home');
  const [reducedMotion, setReducedMotionState] = useState(readMotionPref);
  const run = snap.run;

  const setReducedMotion = (v: boolean) => {
    setReducedMotionState(v);
    try {
      localStorage.setItem(MOTION_KEY, v ? '1' : '0');
    } catch {
      /* preference is optional */
    }
  };
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = reducedMotion ? 'true' : 'false';
  }, [reducedMotion]);

  // Keep the screen consistent with committed state (e.g. after an import or a
  // reload from another tab).
  useEffect(() => {
    if (!run && (screen.k === 'hub' || screen.k === 'ended' || screen.k === 'encounter')) setScreen({ k: 'title' });
    if (run && run.outcome !== 'active' && screen.k === 'hub') setScreen({ k: 'ended' });
  }, [run, screen.k]);

  useEffect(() => {
    const t = screen.k === 'encounter' || screen.k === 'present' ? '' : screen.k === 'hub' ? ' — Town' : '';
    document.title = `Royal Exceptions${t}`;
  }, [screen.k]);

  const goHub = useCallback(() => setScreen(run && run.outcome !== 'active' ? { k: 'ended' } : { k: 'hub' }), [run]);

  const startRun = async (route: Route, name: string) => {
    const r = await session.startNewRun(route, name);
    if (!r) return;
    setLocation('home');
    setScreen({ k: 'present', sceneId: sceneIds.prologue, route: null, location: 'town_square', replay: false, then: { k: 'hub' }, doneLabel: 'Begin Day 1' });
  };

  const onEncounterExit = (e: EncounterExit) => {
    if (e.committed && e.state) {
      if (e.state.outcome === 'won') {
        setScreen({ k: 'present', sceneId: sceneIds.epilogue(e.state.route), route: e.state.route, location: 'palace_court', replay: false, then: { k: 'ended' }, doneLabel: 'Finish' });
        return;
      }
      if (e.state.outcome === 'failed') {
        setScreen({ k: 'present', sceneId: sceneIds.failure, route: null, location: 'palace_court', replay: false, then: { k: 'ended' }, doneLabel: 'Finish' });
        return;
      }
    }
    setScreen({ k: 'hub' });
  };

  // A hub action (rest/training) can also end the run on Day 28 evening.
  const [shownFailureFor, setShownFailureFor] = useState<string | null>(null);
  useEffect(() => {
    if (run && run.outcome === 'failed' && screen.k === 'ended' && shownFailureFor !== run.runId && run.journal.at(-1)?.outcomeAfter === 'failed') {
      const lastKind = run.journal.at(-1)?.kind;
      if (lastKind === 'rest' || lastKind === 'train') {
        setShownFailureFor(run.runId);
        setScreen({ k: 'present', sceneId: sceneIds.failure, route: null, location: 'palace_court', replay: false, then: { k: 'ended' }, doneLabel: 'Finish' });
      } else setShownFailureFor(run.runId);
    }
  }, [run, screen.k, shownFailureFor]);

  if (snap.phase === 'booting')
    return (
      <div className="boot" role="status">
        Loading Royal Exceptions…
      </div>
    );
  if (snap.phase === 'unavailable') return <StorageUnavailable snap={snap} />;

  const notice = snap.notice ?? (snap.lastError && snap.lastError.code in ERROR_TEXT ? snap.lastError.code : null);
  const noticeBar = notice && (
    <div className="banner banner--info" role="alert" data-testid="notice" data-code={notice}>
      <strong>{ERROR_TEXT[notice].title}.</strong> {ERROR_TEXT[notice].body}
      <button type="button" className="btn btn--small btn--quiet" onClick={() => session.clearNotice()}>
        Dismiss
      </button>
    </div>
  );

  const panels = (
    <>
      {panel === 'calendar' && run && <CalendarPanel run={run} onClose={() => setPanel(null)} />}
      {panel === 'journal' && run && <JournalPanel run={run} onClose={() => setPanel(null)} />}
      {panel === 'help' && <HelpPanel run={run} snap={snap} onClose={() => setPanel(null)} />}
      {panel === 'save' && <SavePanel session={session} snap={snap} onClose={() => setPanel(null)} />}
      {panel === 'options' && <OptionsPanel session={session} snap={snap} reducedMotion={reducedMotion} setReducedMotion={setReducedMotion} onClose={() => setPanel(null)} />}
    </>
  );

  if (snap.phase === 'recovery')
    return (
      <div className="app">
        {noticeBar}
        <Recovery session={session} snap={snap} onImport={() => setPanel('save')} onNew={() => setScreen({ k: 'newRun' })} />
        {screen.k === 'newRun' && (
          <NewRun existing={null} onCancel={() => setScreen({ k: 'title' })} onStart={(r, n) => void startRun(r, n)} onExport={() => void exportBackupFile(session)} />
        )}
        {panels}
      </div>
    );

  const hud = run && (screen.k === 'hub' || screen.k === 'encounter' || screen.k === 'ended') && (
    <Hud run={run} snap={snap} onMenu={(m) => (m === 'title' ? setScreen({ k: 'title' }) : setPanel(m))} />
  );

  let body: ReactNode;
  switch (screen.k) {
    case 'title':
      body = (
        <Title
          snap={snap}
          onNew={() => setScreen({ k: 'newRun' })}
          onContinue={goHub}
          onResume={() => snap.draft && setScreen({ k: 'encounter', encounter: snap.draft.originKind, sceneId: snap.draft.sceneId, location: snap.draft.location, resume: snap.draft, nonce: snap.draft.actionId })}
          onGallery={() => setScreen({ k: 'gallery' })}
          onImport={() => setPanel('save')}
          onOptions={() => setPanel('options')}
          onCredits={() => setScreen({ k: 'credits' })}
          onHelp={() => setPanel('help')}
        />
      );
      break;
    case 'newRun':
      body = <NewRun existing={run} onCancel={() => setScreen({ k: 'title' })} onStart={(r, n) => void startRun(r, n)} onExport={() => void exportBackupFile(session)} />;
      break;
    case 'hub':
      body = run ? (
        <Hub
          session={session}
          snap={snap}
          run={run}
          location={location}
          setLocation={setLocation}
          onEncounter={(o: EncounterOffer) =>
            setScreen({ k: 'encounter', encounter: o.encounter, sceneId: o.sceneId, location, resume: snap.draft && snap.draft.sceneId === o.sceneId && snap.draft.location === location ? snap.draft : null, nonce: crypto.randomUUID() })
          }
        />
      ) : null;
      break;
    case 'encounter':
      body = run ? (
        <EncounterPlayer
          key={screen.nonce}
          session={session}
          run={run}
          encounter={screen.encounter}
          sceneId={screen.sceneId}
          location={screen.location}
          resume={screen.resume}
          onExit={onEncounterExit}
          readOnly={snap.access !== 'writer'}
        />
      ) : null;
      break;
    case 'present':
      body = (
        <Presentation
          key={screen.sceneId}
          sceneId={screen.sceneId}
          route={screen.route}
          playerName={run?.playerName ?? 'Traveler'}
          location={screen.location}
          replay={screen.replay}
          doneLabel={screen.doneLabel}
          onDone={() => setScreen(screen.then)}
        />
      );
      break;
    case 'ended':
      body = run ? (
        <Ended
          run={run}
          snap={snap}
          onJournal={() => setPanel('journal')}
          onGallery={() => setScreen({ k: 'gallery' })}
          onTitle={() => setScreen({ k: 'title' })}
          onNewRoute={() => setScreen({ k: 'newRun' })}
          onRestart={() => void startRun(run.route, run.playerName)}
        />
      ) : null;
      break;
    case 'gallery':
      body = (
        <Gallery
          gallery={snap.gallery}
          onBack={() => setScreen({ k: 'title' })}
          onReplay={(r, which) =>
            setScreen(
              which === 'epilogue'
                ? { k: 'present', sceneId: sceneIds.epilogue(r), route: r, location: 'palace_court', replay: true, then: { k: 'gallery' }, doneLabel: 'Back to gallery' }
                : { k: 'present', sceneId: sceneIds.prologue, route: null, location: 'town_square', replay: true, then: { k: 'gallery' }, doneLabel: 'Back to gallery' },
            )
          }
        />
      );
      break;
    case 'credits':
      body = <Credits onBack={() => setScreen({ k: 'title' })} />;
      break;
  }

  return (
    <div className={`app${run ? ` route-${run.route.toLowerCase()}` : ''}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {hud}
      {snap.access !== 'writer' && screen.k !== 'title' && <AccessBanner snap={snap} onTakeover={() => void session.requestTakeover()} />}
      {snap.access === 'read_only' && screen.k === 'title' && (
        <div className="row row--center">
          <button type="button" className="btn btn--small" onClick={() => void session.requestTakeover()} disabled={snap.takeoverWaiting}>
            {snap.takeoverWaiting ? 'Waiting for the other tab to close…' : 'Take over when the other tab closes'}
          </button>
        </div>
      )}
      {noticeBar}
      <div id="main-content" tabIndex={-1} className="content">
        {body}
      </div>
      {panels}
    </div>
  );
}
