// Town hub: free location navigation, the princess's availability here and
// now, training, Rest/Pass, Humpty's free Town Square quips, and the result of
// the last committed action.
import { useRef, useState } from 'react';
import { CONTENT, getScene, supportString } from '../../core/content';
import { canRest, encounterAvailability, trainingAvailability, type EncounterOffer } from '../../core/engine';
import { LOCATIONS, type JournalRecord, type LocationId, type PlayerAction, type RunState } from '../../core/model';
import { meetingLocation } from '../../core/schedule';
import type { GameSession, SessionSnapshot } from '../../persistence/session';
import { ERROR_TEXT } from '../../persistence/errors';
import { Stage } from '../components/Stage';
import { RichText } from '../RichText';
import { displayTitle, heartsText, LOCATION_NAME, ROUTE_NAME, SLOT_NAME, STAT_NAME } from '../labels';

// Town Square quips cycle deterministically within this browser session only.
let quipCursor = 0;

export function Hub({
  session,
  snap,
  run,
  location,
  setLocation,
  onEncounter,
  onResume,
}: {
  session: GameSession;
  snap: SessionSnapshot;
  run: RunState;
  location: LocationId;
  setLocation: (l: LocationId) => void;
  onEncounter: (offer: EncounterOffer) => void;
  onResume: () => void;
}) {
  const [result, setResult] = useState<JournalRecord | null>(null);
  const [refusal, setRefusal] = useState<string | null>(null);
  const [quip, setQuip] = useState<string | null>(null);
  const busy = useRef(false);
  const [busyUi, setBusyUi] = useState(false);
  const writable = snap.access === 'writer' && run.outcome === 'active';
  // An unfinished conversation has to be resumed or left before anything else
  // uses time (SPEC §3: no cost-bearing action while an encounter is unresolved).
  const pending = !!snap.draft;
  const avail = encounterAvailability(run, location);
  const training = trainingAvailability(run, location);
  const princess = ROUTE_NAME[run.route];
  const whereNow = meetingLocation(run.route, run.day, run.slot);
  const here = avail.princessLocationNow === location;

  const commit = async (action: PlayerAction) => {
    if (busy.current || !writable || pending) return;
    busy.current = true;
    setBusyUi(true);
    setRefusal(null);
    const r = await session.commit(action);
    busy.current = false;
    setBusyUi(false);
    if (r.ok) setResult(r.state.journal.find((j) => j.actionId === action.actionId) ?? null);
    else if (r.code === 'stat_capped') setRefusal(supportString('TXT-TRAIN-CAPPED'));
    else if (!(r.code in ERROR_TEXT)) setRefusal(`That action is not available right now (${r.code}). No time has passed.`);
  };

  const go = (l: LocationId) => {
    setLocation(l);
    setResult(null);
    setRefusal(null);
    setQuip(null);
  };

  const blockedText = (() => {
    if (!avail.blocked) return null;
    switch (avail.blocked.code) {
      case 'used_today':
        return supportString('TXT-USED');
      case 'not_scheduled':
        return here ? supportString('TXT-UNAVAILABLE') : null;
      case 'midpoint_requirements':
        return null;
      default:
        return null;
    }
  })();

  const offerLabel = (o: EncounterOffer) => {
    switch (o.encounter) {
      case 'ordinary':
        return { title: `Meet ${princess}`, desc: 'A conversation. Uses this time slot and today’s meeting.' };
      case 'optional':
        return { title: `Special moment with ${princess}`, desc: `${displayTitle(getScene(o.sceneId)?.title ?? '')} — a one-time moment that may not come again. Uses this time slot and today’s meeting.` };
      case 'midpoint':
      case 'midpoint_retry':
        return { title: `Pivotal moment with ${princess}`, desc: 'An important conversation that cannot be skipped. Uses this time slot and today’s meeting.' };
      case 'proposal_retry':
        return { title: `Talk with ${princess} about the future`, desc: 'A follow-up to your proposal. Uses this time slot and today’s meeting.' };
    }
  };

  return (
    <main className="hub" data-testid="hub" data-location={location}>
      <Stage location={location} princess={here && !run.dailyEncounterUsed ? { route: run.route, expression: 'NEUTRAL' } : null} cg={null} />

      <section className="place panel" aria-labelledby="place-title">
        <h2 id="place-title">{LOCATION_NAME[location]}</h2>
        <p className="muted" data-testid="whereabouts">
          {whereNow
            ? whereNow === location
              ? run.dailyEncounterUsed
                ? `${princess} is here, but you have already spoken today.`
                : `${princess} is here this ${SLOT_NAME[run.slot].toLowerCase()}.`
              : `${princess} is at the ${LOCATION_NAME[whereNow]} this ${SLOT_NAME[run.slot].toLowerCase()}.`
            : `${princess} is not available this ${SLOT_NAME[run.slot].toLowerCase()}. Check the calendar.`}
        </p>

        {result && <ActionResult record={result} run={run} />}
        {refusal && (
          <p className="notice" role="alert">
            {refusal}
          </p>
        )}
        {pending && (
          <div className="notice" role="status" data-testid="pending-encounter">
            <p>You have an unfinished conversation with {princess}. Finish it or leave it before doing anything else here.</p>
            <div className="row">
              <button type="button" className="btn btn--primary btn--small" onClick={onResume} disabled={snap.access !== 'writer'}>
                Resume conversation
              </button>
              <button type="button" className="btn btn--small" onClick={() => void session.discardDraft()} disabled={snap.access !== 'writer'}>
                Leave it (no time passes)
              </button>
            </div>
          </div>
        )}

        {!pending && avail.offers.length > 0 && (
          <div className="actions" role="group" aria-label={`Meet ${princess}`}>
            {avail.offers.map((o) => {
              const l = offerLabel(o);
              return (
                <button key={o.encounter} type="button" className="btn btn--primary action" disabled={!writable || busyUi} onClick={() => onEncounter(o)} data-encounter={o.encounter}>
                  <span className="action__title">{l.title}</span>
                  <span className="action__desc">{l.desc}</span>
                </button>
              );
            })}
          </div>
        )}
        {avail.blocked?.code === 'midpoint_requirements' && avail.blocked.requirements && (
          <div className="requirements" role="status" data-testid="requirements">
            <p>{CONTENT.support.help.find((h) => h.id === 'HD-HELP-CAP_BLOCKED')?.text}</p>
            <ul>
              {[avail.blocked.requirements.primary, avail.blocked.requirements.secondary].map((r) => (
                <li key={r.stat} className={r.have >= r.need ? 'met' : 'unmet'}>
                  {STAT_NAME[r.stat]} {r.need} needed — you have {r.have} {r.have >= r.need ? '(met)' : '(not yet)'}
                </li>
              ))}
            </ul>
          </div>
        )}
        {blockedText && <p className="notice">{blockedText}</p>}

        {training.length > 0 && (
          <div className="actions" role="group" aria-label="Training">
            {training.map((t) => {
              const info = CONTENT.support.activities.find((a) => a.id === t.activity.id)!;
              return (
                <button
                  key={t.activity.id}
                  type="button"
                  className="btn action"
                  disabled={!writable || busyUi || pending || !t.available}
                  onClick={() => commit({ type: 'train', actionId: crypto.randomUUID(), location, activityId: t.activity.id })}
                  data-activity={t.activity.id}
                >
                  <span className="action__title">{info.title}</span>
                  <span className="action__desc">
                    {t.reason === 'stat_capped' ? supportString('TXT-TRAIN-CAPPED') : `Train ${STAT_NAME[t.activity.stat]} (now ${run.stats[t.activity.stat]}). Uses this time slot.`}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {location === 'town_square' && (
          <div className="quip">
            <button
              type="button"
              className="btn btn--quiet"
              onClick={() => {
                const q = CONTENT.support.squareQuips[quipCursor % CONTENT.support.squareQuips.length]!;
                quipCursor++;
                setQuip(q.text);
              }}
            >
              Hear Humpty’s comment (free)
            </button>
            {quip && (
              <blockquote className="quip__text" role="status">
                <span className="line__speaker">Humpty</span>
                <RichText text={quip} playerName={run.playerName} />
              </blockquote>
            )}
          </div>
        )}

        <div className="actions actions--rest">
          <button type="button" className="btn action" disabled={!writable || busyUi || pending || !canRest(run)} onClick={() => commit({ type: 'rest', actionId: crypto.randomUUID(), location })} data-testid="rest">
            <span className="action__title">Rest / Pass this slot</span>
            <span className="action__desc">Uses this time slot with no reward.</span>
          </button>
        </div>
      </section>

      <nav className="map panel" aria-label="Town locations (moving is free)">
        <h2 className="map__title">Town</h2>
        <p className="muted small">Moving around town is free. Only actions use time.</p>
        <ul className="map__list">
          {LOCATIONS.map((l) => (
            <li key={l}>
              <button type="button" className={`btn map__btn${l === location ? ' is-current' : ''}`} aria-current={l === location ? 'location' : undefined} onClick={() => go(l)} data-goto={l}>
                <span>{LOCATION_NAME[l]}</span>
                {whereNow === l && (
                  <span className="map__marker">
                    <span aria-hidden="true">★ </span>
                    {princess}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

function ActionResult({ record, run }: { record: JournalRecord; run: RunState }) {
  if (record.kind === 'train' && record.statBeforeAfterOrNull) {
    const sc = record.statBeforeAfterOrNull;
    const act = CONTENT.support.activities.find((a) => a.id === record.sceneIdOrActivityId)!;
    const leveled = sc.levelAfter > sc.levelBefore;
    return (
      <div className="result" role="status" data-testid="action-result">
        {act.lines.map((l) => (
          <p key={l.id} className="line--narration">
            <RichText text={l.text} playerName={run.playerName} />
          </p>
        ))}
        <p>
          <strong>{supportString(leveled ? 'TXT-TRAIN-LEVEL' : 'TXT-TRAIN-PARTIAL')}</strong>
        </p>
        <p className="muted">
          {STAT_NAME[sc.stat]}: {sc.levelBefore}
          {sc.partialBefore ? ' (+½)' : ''} → {sc.levelAfter}
          {sc.partialAfter ? ' (+½: one more session to the next level)' : ''}.
        </p>
      </div>
    );
  }
  if (record.kind === 'rest') {
    return (
      <div className="result" role="status" data-testid="action-result">
        <p>You let the {SLOT_NAME[record.slotBefore].toLowerCase()} pass.</p>
        {run.outcome === 'active' && <p className="muted">Now Day {run.day}, {SLOT_NAME[run.slot].toLowerCase()}.</p>}
      </div>
    );
  }
  return (
    <div className="result" role="status" data-testid="action-result">
      <p>
        Hearts now {heartsText(record.heartsAfterHalf)} of 10.
      </p>
    </div>
  );
}
