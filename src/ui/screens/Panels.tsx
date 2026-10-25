// Free, read-only panels (calendar, journal, help) plus backup, options,
// recovery and end-of-run screens.
import { useRef, useState } from 'react';
import { CONTENT, getScene } from '../../core/content';
import { SLOTS, type JournalRecord, type Route, type RunState } from '../../core/model';
import { meetingLocation, weekdayOf, timeIndex } from '../../core/schedule';
import type { GameSession, SessionSnapshot } from '../../persistence/session';
import type { ParsedBackup } from '../../persistence/backup';
import { ERROR_TEXT, type SaveErrorCode } from '../../persistence/errors';
import { Confirm, Modal } from '../components/Modal';
import { relevantHelp } from '../helpContext';
import { displayTitle, heartsText, LOCATION_NAME, ROUTE_NAME, SLOT_NAME, STAT_NAME, WEEKDAY_NAME } from '../labels';

export function CalendarPanel({ run, onClose }: { run: RunState; onClose: () => void }) {
  const now = timeIndex(run.day, run.slot);
  return (
    <Modal title={`${ROUTE_NAME[run.route]}’s weekly schedule`} onClose={onClose} wide>
      <p className="muted">The same week repeats four times. {ROUTE_NAME[run.route]} can be met once per day, in one of her scheduled slots, at the place shown.</p>
      <div className="calendar-wrap">
        <table className="calendar" data-testid="calendar">
          <caption className="visually-hidden">28-day calendar showing where {ROUTE_NAME[run.route]} can be met</caption>
          <thead>
            <tr>
              <th scope="col">Week</th>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <th key={d} scope="col">
                  <abbr title={WEEKDAY_NAME[d]}>{d}</abbr>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3].map((w) => (
              <tr key={w}>
                <th scope="row">{w + 1}</th>
                {[1, 2, 3, 4, 5, 6, 7].map((d0) => {
                  const day = w * 7 + d0;
                  const slots = SLOTS.map((s) => ({ s, loc: meetingLocation(run.route, day, s), t: timeIndex(day, s) }));
                  const meet = slots.filter((x) => x.loc);
                  const isToday = day === run.day;
                  const past = timeIndex(day, 'evening') < now;
                  const label = `Day ${day}, ${WEEKDAY_NAME[weekdayOf(day)]}: ${meet.length ? `${ROUTE_NAME[run.route]} at ${LOCATION_NAME[meet[0]!.loc!]} in the ${meet.map((m) => m.s).join(' and ')}` : 'not available'}${isToday ? '. Today' : past ? '. Past' : ''}.`;
                  return (
                    <td key={d0} className={`${isToday ? 'is-today' : ''}${past ? ' is-past' : ''}`} aria-label={label}>
                      <div className="cal__day" aria-hidden="true">
                        <span className="cal__wd">{weekdayOf(day)} </span>
                        {day}
                      </div>
                      <ul className="cal__slots" aria-hidden="true">
                        {slots.map((x) => (
                          <li key={x.s} className={`${x.loc ? 'has-meet' : ''}${x.t === now ? ' is-now' : ''}`}>
                            <span className="cal__slot">{x.s[0]!.toUpperCase()}</span> {x.loc ? LOCATION_NAME[x.loc] : '—'}
                          </li>
                        ))}
                      </ul>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

export function describeRecord(r: JournalRecord): string {
  const hearts = r.heartsAfterHalf !== r.heartsBeforeHalf ? ` Hearts ${heartsText(r.heartsBeforeHalf)} → ${heartsText(r.heartsAfterHalf)}.` : '';
  switch (r.kind) {
    case 'rest':
      return `Rested at ${LOCATION_NAME[r.location]}.`;
    case 'train': {
      const a = CONTENT.support.activities.find((x) => x.id === r.sceneIdOrActivityId);
      const sc = r.statBeforeAfterOrNull!;
      return `${a?.title ?? 'Trained'} (${STAT_NAME[sc.stat]} ${sc.levelBefore}${sc.partialBefore ? '+½' : ''} → ${sc.levelAfter}${sc.partialAfter ? '+½' : ''}).`;
    }
    default: {
      const s = getScene(r.sceneIdOrActivityId ?? '');
      const title = s ? displayTitle(s.title) : r.sceneIdOrActivityId;
      const kind = r.kind === 'ordinary' ? 'Conversation' : r.kind === 'optional' ? 'Special moment' : r.kind === 'proposal_retry' ? 'Proposal follow-up' : 'Pivotal moment';
      const extra =
        r.midpointBeforeAfter[1] === 'completed' && r.midpointBeforeAfter[0] !== 'completed'
          ? ' Milestone complete.'
          : r.midpointBeforeAfter[1] === 'retry_pending' && r.midpointBeforeAfter[0] !== 'retry_pending'
            ? ' Milestone not yet complete.'
            : '';
      const prop = r.linkedProposalChoiceId ? (r.outcomeAfter === 'won' ? ' Proposal accepted.' : ' Proposal not accepted yet.') : r.kind === 'proposal_retry' ? (r.outcomeAfter === 'won' ? ' Proposal accepted.' : ' Not yet.') : '';
      return `${kind} at ${LOCATION_NAME[r.location]}: “${title}”.${hearts}${extra}${prop}`;
    }
  }
}

export function JournalPanel({ run, onClose }: { run: RunState; onClose: () => void }) {
  return (
    <Modal title="Journal" onClose={onClose} wide>
      {run.journal.length === 0 ? (
        <p className="muted">No actions yet. The journal records each completed action.</p>
      ) : (
        <ol className="journal" data-testid="journal">
          {run.journal.map((r) => (
            <li key={r.actionId}>
              <span className="journal__when">
                Day {r.dayBefore} · {weekdayOf(r.dayBefore)} · {SLOT_NAME[r.slotBefore]}
              </span>
              <span className="journal__what">{describeRecord(r)}</span>
            </li>
          ))}
        </ol>
      )}
    </Modal>
  );
}

export function HelpPanel({ run, snap, onClose }: { run: RunState | null; snap: SessionSnapshot; onClose: () => void }) {
  const ctx = relevantHelp(run, snap);
  const help = CONTENT.support.help;
  const ordered = [...help.filter((h) => ctx.includes(h.id)), ...help.filter((h) => !ctx.includes(h.id))];
  return (
    <Modal title="Help from Humpty Dumpty" onClose={onClose} wide>
      <div className="help" data-testid="help">
        {ordered.map((h) => (
          <section key={h.id} className={`help__item${ctx.includes(h.id) ? ' is-relevant' : ''}`}>
            <h3>
              {h.title}
              {ctx.includes(h.id) && <span className="badge">Relevant now</span>}
            </h3>
            <p>{h.text}</p>
          </section>
        ))}
      </div>
    </Modal>
  );
}

function download(text: string, filename: string) {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportBackupFile(session: GameSession) {
  const text = await session.exportBackup();
  download(text, `royal-exceptions-backup-${new Date().toISOString().slice(0, 10)}.json`);
}

export function SavePanel({ session, snap, onClose }: { session: GameSession; snap: SessionSnapshot; onClose: () => void }) {
  const [preview, setPreview] = useState<ParsedBackup | null>(null);
  const [error, setError] = useState<{ code: SaveErrorCode; details: string[] } | null>(null);
  const [replaceRun, setReplaceRun] = useState(true);
  const [galleryMode, setGalleryMode] = useState<'union' | 'replace'>('union');
  const [confirm, setConfirm] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const file = useRef<HTMLInputElement>(null);
  const writable = snap.access === 'writer';

  const onFile = async (f: File | undefined) => {
    setError(null);
    setPreview(null);
    setDone(null);
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) return setError({ code: 'ERR_IMPORT_FORMAT', details: ['file is larger than 5 MiB'] });
    const p = await session.previewImport(await f.text());
    if (p.ok) setPreview(p);
    else setError({ code: p.code, details: p.details });
  };
  const cancel = () => {
    setPreview(null);
    setConfirm(false);
    setDone(ERROR_TEXT.ERR_IMPORT_CANCELED.body);
    if (file.current) file.current.value = '';
  };
  const ok = preview && preview.ok ? preview : null;
  return (
    <Modal title="Save & backup" onClose={onClose} wide>
      <div className="stack" data-testid="save-panel">
        <p className="muted">{CONTENT.support.help.find((h) => h.id === 'HD-HELP-SAVING')?.text}</p>
        <section>
          <h3>{CONTENT.support.strings['UI-SAVE-01']}</h3>
          <p>
            {snap.run
              ? `${ROUTE_NAME[snap.run.route]} · Day ${snap.run.day} ${SLOT_NAME[snap.run.slot].toLowerCase()} · ${heartsText(snap.run.heartsHalf)} hearts · ${snap.run.outcome} · revision ${snap.run.saveRevision}`
              : 'No active run.'}
            {' · '}Endings unlocked: {snap.gallery.length ? snap.gallery.map((r) => ROUTE_NAME[r]).join(', ') : 'none'}.
          </p>
        </section>
        <section>
          <h3>{CONTENT.support.strings['UI-SAVE-02']}</h3>
          <p className="muted small">Downloads your saved progress and endings as a JSON file (unfinished conversations are not included).</p>
          <button type="button" className="btn" onClick={() => void exportBackupFile(session)} data-testid="export">
            Download backup
          </button>
        </section>
        <section>
          <h3>{CONTENT.support.strings['UI-SAVE-03']}</h3>
          <label className="field">
            <span>Choose a backup file</span>
            <input ref={file} type="file" accept="application/json,.json" onChange={(e) => void onFile(e.target.files?.[0])} disabled={!writable} data-testid="import-file" />
          </label>
          {!writable && <p className="small muted">Importing is only possible in the tab that owns the save.</p>}
          {error && (
            <div className="notice notice--error" role="alert" data-testid="import-error" data-code={error.code}>
              <strong>{ERROR_TEXT[error.code].title}.</strong> {ERROR_TEXT[error.code].body}
              <details>
                <summary>Details</summary>
                <ul>
                  {error.details.slice(0, 8).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </details>
              <p className="small">{CONTENT.support.help.find((h) => h.id === 'HD-HELP-RECOVERY')?.text}</p>
            </div>
          )}
          {ok && (
            <div className="import-preview" data-testid="import-preview">
              <h4>Backup contents</h4>
              <p>
                {ok.activeRun
                  ? `${ROUTE_NAME[ok.activeRun.route]} · Day ${ok.activeRun.day} ${SLOT_NAME[ok.activeRun.slot].toLowerCase()} · ${heartsText(ok.activeRun.heartsHalf)} hearts · ${ok.activeRun.outcome}`
                  : 'No active run (endings only).'}
                {' · '}Endings: {ok.completedGallery.length ? ok.completedGallery.map((r: Route) => ROUTE_NAME[r]).join(', ') : 'none'}
                {ok.exportedAt ? ` · exported ${new Date(ok.exportedAt).toLocaleString()}` : ''}
              </p>
              {ok.activeRun && (
                <label className="check">
                  <input type="checkbox" checked={replaceRun} onChange={(e) => setReplaceRun(e.target.checked)} /> Replace the active run with this backup’s run
                </label>
              )}
              <fieldset className="radio-group">
                <legend>Endings gallery</legend>
                <label>
                  <input type="radio" name="gm" checked={galleryMode === 'union'} onChange={() => setGalleryMode('union')} /> Keep my endings and add the backup’s (recommended)
                </label>
                <label>
                  <input type="radio" name="gm" checked={galleryMode === 'replace'} onChange={() => setGalleryMode('replace')} /> Replace my endings with the backup’s
                </label>
              </fieldset>
              <div className="row">
                <button type="button" className="btn" onClick={cancel}>
                  Cancel
                </button>
                <button type="button" className="btn btn--primary" onClick={() => setConfirm(true)} data-testid="import-confirm">
                  {ok.activeRun && replaceRun ? 'Replace active run…' : 'Import endings…'}
                </button>
              </div>
            </div>
          )}
          {done && (
            <p className="notice" role="status">
              {done}
            </p>
          )}
        </section>
      </div>
      {confirm && ok && (
        <Confirm
          title={ok.activeRun && replaceRun ? 'Replace active run?' : 'Import endings?'}
          confirmLabel={ok.activeRun && replaceRun ? 'Replace active run' : 'Import'}
          danger={!!(ok.activeRun && replaceRun) || galleryMode === 'replace'}
          onCancel={() => setConfirm(false)}
          onConfirm={async () => {
            setConfirm(false);
            const r = await session.confirmImport(ok, { replaceRun: !!ok.activeRun && replaceRun, galleryMode });
            setPreview(null);
            setDone(r ? 'Backup imported. Your previous run is kept as the recovery snapshot.' : 'Import failed. Nothing was changed.');
          }}
        >
          <p>
            {ok.activeRun && replaceRun
              ? `Your current run${snap.run ? ` (${ROUTE_NAME[snap.run.route]}, Day ${snap.run.day})` : ''} will be replaced by the backup’s ${ROUTE_NAME[ok.activeRun.route]} run. The replaced run is kept as a one-step recovery snapshot.`
              : 'Endings from the backup will be added to your gallery.'}
          </p>
          {galleryMode === 'replace' && <p className="error">You chose to replace your endings gallery: endings not in the backup will be removed.</p>}
        </Confirm>
      )}
    </Modal>
  );
}

export function OptionsPanel({
  session,
  snap,
  reducedMotion,
  setReducedMotion,
  onClose,
}: {
  session: GameSession;
  snap: SessionSnapshot;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  onClose: () => void;
}) {
  const [ask, setAsk] = useState<'run' | 'all' | null>(null);
  const writable = snap.access === 'writer';
  return (
    <Modal title="Options" onClose={onClose}>
      <div className="stack">
        <label className="check">
          <input type="checkbox" checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)} /> Reduce motion (also follows your system setting)
        </label>
        <section>
          <h3>Saved data</h3>
          <div className="row">
            <button type="button" className="btn" disabled={!writable || !snap.run} onClick={() => setAsk('run')}>
              Delete current run…
            </button>
            <button type="button" className="btn btn--danger" disabled={!writable} onClick={() => setAsk('all')}>
              Erase all data…
            </button>
          </div>
        </section>
      </div>
      {ask && (
        <Confirm
          title={ask === 'run' ? 'Delete the current run?' : 'Erase all saved data?'}
          confirmLabel={ask === 'run' ? 'Delete run' : 'Erase everything'}
          danger
          onCancel={() => setAsk(null)}
          onConfirm={async () => {
            setAsk(null);
            if (ask === 'run') await session.deleteRun();
            else await session.eraseAll();
          }}
        >
          <p>{ask === 'run' ? 'The active run and its recovery snapshot will be deleted. Your endings gallery is kept.' : 'The active run, its recovery snapshot and your endings gallery will all be deleted from this browser.'}</p>
          <p>Export a backup first if you might want this progress later.</p>
        </Confirm>
      )}
    </Modal>
  );
}

export function Recovery({ session, snap, onImport, onNew }: { session: GameSession; snap: SessionSnapshot; onImport: () => void; onNew: () => void }) {
  const [ask, setAsk] = useState(false);
  const rec = snap.recovery!;
  const pg = rec.previousGood;
  return (
    <main className="panel" data-testid="recovery">
      <h1>Your saved run needs attention</h1>
      <p>The current save failed its consistency check, so it has not been loaded. Nothing has been changed or reset. Your endings gallery is safe ({snap.gallery.length}/3 unlocked).</p>
      <details>
        <summary>What failed</summary>
        <ul>
          {rec.activeErrors.slice(0, 6).map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </details>
      <h2>Options</h2>
      {pg ? (
        <p>
          A previous saved state is available: {ROUTE_NAME[pg.route]}, Day {pg.day} {SLOT_NAME[pg.slot].toLowerCase()}, {heartsText(pg.heartsHalf)} hearts ({pg.outcome}), revision {pg.saveRevision}.
        </p>
      ) : (
        <p className="muted">No usable previous snapshot exists.</p>
      )}
      <p className="small muted">{CONTENT.support.help.find((h) => h.id === 'HD-HELP-RECOVERY')?.text}</p>
      <div className="row">
        {pg && (
          <button type="button" className="btn btn--primary" disabled={snap.access !== 'writer'} onClick={() => setAsk(true)}>
            Restore previous snapshot…
          </button>
        )}
        <button type="button" className="btn" onClick={onImport}>
          Import a backup
        </button>
        <button type="button" className="btn" onClick={onNew} disabled={snap.access !== 'writer'}>
          Start a new run
        </button>
      </div>
      {ask && pg && (
        <Confirm title="Restore the previous snapshot?" confirmLabel="Restore" onCancel={() => setAsk(false)} onConfirm={() => void session.restorePreviousGood()}>
          <p>The damaged save will be replaced by the previous snapshot ({ROUTE_NAME[pg.route]}, Day {pg.day}). This is one step back, not a rewind feature.</p>
        </Confirm>
      )}
    </main>
  );
}

export function Ended({ run, snap, onJournal, onRestart, onNewRoute, onGallery, onTitle }: { run: RunState; snap: SessionSnapshot; onJournal: () => void; onRestart: () => void; onNewRoute: () => void; onGallery: () => void; onTitle: () => void }) {
  const won = run.outcome === 'won';
  const [ask, setAsk] = useState<'restart' | null>(null);
  return (
    <main className="panel ended" data-testid="ended" data-outcome={run.outcome}>
      <h1>{won ? `You married ${ROUTE_NAME[run.route]}` : CONTENT.support.strings['UI-FAIL-01']}</h1>
      <p>{won ? `Your ending is now in the gallery. Day ${run.day} of 28.` : CONTENT.support.strings['UI-FAIL-02']}</p>
      <div className="row">
        <button type="button" className="btn" onClick={onJournal}>
          Read the journal
        </button>
        <button type="button" className="btn" onClick={onGallery}>
          Endings gallery
        </button>
        <button type="button" className="btn" onClick={() => setAsk('restart')} disabled={snap.access !== 'writer'}>
          Restart {ROUTE_NAME[run.route]}’s route…
        </button>
        <button type="button" className="btn btn--primary" onClick={onNewRoute} disabled={snap.access !== 'writer'}>
          Start a new route
        </button>
        <button type="button" className="btn btn--quiet" onClick={onTitle}>
          Title screen
        </button>
      </div>
      {ask && (
        <Confirm title={`Restart ${ROUTE_NAME[run.route]}’s route?`} confirmLabel="Restart" danger onCancel={() => setAsk(null)} onConfirm={onRestart}>
          <p>{CONTENT.support.strings['UI-CONFIRM-01']}</p>
        </Confirm>
      )}
    </main>
  );
}
