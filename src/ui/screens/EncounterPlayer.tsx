// Plays one princess encounter end to end:
//   intro lines → choice → (if projected hearts reach 20: origin branch →
//   linked full proposal → proposal choice) → ONE commit → result lines →
//   outcome panel.
// Every step before the commit is mirrored into the non-reward-bearing draft
// so a refresh resumes exactly here; nothing is awarded until the commit.
import { useEffect, useRef, useState } from 'react';
import type { ChoiceOption, Expression, Scene, ScriptLine } from '../../content/types';
import type { EncounterKind, JournalRecord, LocationId, PlayerAction, RunState } from '../../core/model';
import { getScene, sceneIds, supportString, CONTENT } from '../../core/content';
import { projectEarning } from '../../core/engine';
import type { GameSession } from '../../persistence/session';
import type { EncounterDraft } from '../../persistence/draft';
import { ERROR_TEXT, type SaveErrorCode } from '../../persistence/errors';
import { Stage } from '../components/Stage';
import { Choices, Dialogue } from '../components/Dialogue';
import { PRINCESS_SPEAKER, sceneLocation, sceneShowsCg } from '../sceneStaging';
import { displayTitle, heartsText, ROUTE_NAME } from '../labels';

type Phase =
  | { k: 'intro'; i: number }
  | { k: 'choice' }
  | { k: 'branch'; i: number }
  | { k: 'linkNotice' }
  | { k: 'pIntro'; i: number }
  | { k: 'pChoice' }
  | { k: 'committing' }
  | { k: 'commitError'; code: string }
  | { k: 'after'; i: number }
  | { k: 'result' };

export interface EncounterExit {
  committed: boolean;
  state?: RunState;
  record?: JournalRecord;
  notice?: SaveErrorCode;
}

const help = (id: string) => CONTENT.support.help.find((h) => h.id === id)?.text ?? '';

function lastExpression(lines: ScriptLine[], speaker: string): Expression {
  let e: Expression = 'NEUTRAL';
  for (const l of lines) if (l.speaker === speaker && l.expression) e = l.expression;
  return e;
}

/** Map a stored draft back to a phase. */
function phaseFromDraft(d: EncounterDraft, scene: Scene, proposal: Scene): Phase {
  if (d.stage === 'intro') return d.progressLineIndex >= scene.introLines.length ? { k: 'choice' } : { k: 'intro', i: d.progressLineIndex };
  if (d.stage === 'branch') return { k: 'branch', i: d.progressLineIndex };
  if (d.stage === 'linked_proposal') return d.progressLineIndex >= proposal.introLines.length ? { k: 'pChoice' } : { k: 'pIntro', i: d.progressLineIndex };
  return { k: 'committing' };
}

export function EncounterPlayer({
  session,
  run,
  encounter,
  sceneId,
  location,
  resume,
  onExit,
  readOnly,
}: {
  session: GameSession;
  run: RunState;
  encounter: EncounterKind;
  sceneId: string;
  location: LocationId;
  resume: EncounterDraft | null;
  onExit: (e: EncounterExit) => void;
  readOnly: boolean;
}) {
  const scene = getScene(sceneId);
  const proposal = getScene(sceneIds.proposal(run.route))!;
  const startRun = useRef(run).current;
  const draftRef = useRef<EncounterDraft>(
    resume ?? {
      actionId: crypto.randomUUID(),
      startRevision: run.saveRevision,
      sceneId,
      originKind: encounter,
      location,
      progressLineIndex: 0,
      selectedOriginChoiceId: null,
      selectedProposalChoiceId: null,
      stage: 'intro',
      route: run.route,
      day: run.day,
      slot: run.slot,
      createdAt: new Date().toISOString(),
    },
  );
  const originChoiceInit = resume?.selectedOriginChoiceId ? scene?.options.find((o) => o.choiceId === resume.selectedOriginChoiceId) ?? null : null;
  const proposalChoiceInit = resume?.selectedProposalChoiceId ? proposal.options.find((o) => o.choiceId === resume.selectedProposalChoiceId) ?? null : null;
  const [origin, setOrigin] = useState<ChoiceOption | null>(originChoiceInit);
  const [propChoice, setPropChoice] = useState<ChoiceOption | null>(proposalChoiceInit);
  const [phase, setPhase] = useState<Phase>(() => (scene ? (resume ? phaseFromDraft(resume, scene, proposal) : { k: 'intro', i: 0 }) : { k: 'commitError', code: 'ERR_CONTENT_MISSING' }));
  const [committed, setCommitted] = useState<{ state: RunState; record: JournalRecord } | null>(null);
  const busy = useRef(false);
  const autoCommitted = useRef(false);

  const saveDraft = (patch: Partial<EncounterDraft>) => {
    draftRef.current = { ...draftRef.current, ...patch };
    if (!readOnly) void session.saveDraft(draftRef.current);
  };

  const doCommit = async (originOpt: ChoiceOption, propOpt: ChoiceOption | null) => {
    if (busy.current) return;
    busy.current = true;
    setPhase({ k: 'committing' });
    saveDraft({ stage: 'ready_to_commit', selectedOriginChoiceId: originOpt.choiceId, selectedProposalChoiceId: propOpt?.choiceId ?? null });
    const action: PlayerAction = {
      type: 'encounter',
      actionId: draftRef.current.actionId,
      location,
      encounter,
      sceneId,
      choiceId: originOpt.choiceId,
      linkedProposalChoiceId: propOpt?.choiceId ?? null,
    };
    const r = await session.commit(action);
    busy.current = false;
    if (r.ok) {
      const record = r.state.journal.find((j) => j.actionId === action.actionId)!;
      setCommitted({ state: r.state, record });
      setPhase({ k: 'after', i: 0 });
    } else if (r.code === 'ERR_DRAFT_CONFLICT') {
      onExit({ committed: false, notice: 'ERR_DRAFT_CONFLICT' });
    } else setPhase({ k: 'commitError', code: r.code });
  };

  // Resumed at ready_to_commit: finish that same commit once (same actionId, so
  // a commit that had already landed is recognised as a duplicate, not re-awarded).
  // Runs on mount only; the draft it reads is fixed for this component's lifetime.
  useEffect(() => {
    if (resume?.stage === 'ready_to_commit' && originChoiceInit && !autoCommitted.current) {
      autoCommitted.current = true;
      void doCommit(originChoiceInit, proposalChoiceInit);
    }
  }, []);

  const abandon = async () => {
    if (!readOnly) await session.discardDraft();
    onExit({ committed: false });
  };

  if (!scene) {
    return (
      <div className="panel" role="alert">
        <h2>{ERROR_TEXT.ERR_CONTENT_MISSING.title}</h2>
        <p>{ERROR_TEXT.ERR_CONTENT_MISSING.body}</p>
        <button type="button" className="btn" onClick={() => onExit({ committed: false })}>
          Return to town
        </button>
      </div>
    );
  }

  // ---- what is on screen ---------------------------------------------------
  const princessSpeaker = PRINCESS_SPEAKER[run.route];
  let currentScene: Scene = scene;
  let seen: ScriptLine[] = [];
  let line: ScriptLine | null = null;
  const originBranch = origin?.branchLines ?? [];
  const propBranch = propChoice?.branchLines ?? [];
  const afterLines = committed ? (committed.record.linkedProposalChoiceId ? propBranch : originBranch) : [];
  switch (phase.k) {
    case 'intro':
      line = scene.introLines[phase.i]!;
      seen = scene.introLines.slice(0, phase.i + 1);
      break;
    case 'choice':
      seen = scene.introLines;
      break;
    case 'branch':
      line = originBranch[phase.i]!;
      seen = [...scene.introLines, ...originBranch.slice(0, phase.i + 1)];
      break;
    case 'linkNotice':
      seen = [...scene.introLines, ...originBranch];
      break;
    case 'pIntro':
      currentScene = proposal;
      line = proposal.introLines[phase.i]!;
      seen = [...scene.introLines, ...originBranch, ...proposal.introLines.slice(0, phase.i + 1)];
      break;
    case 'pChoice':
      currentScene = proposal;
      seen = [...scene.introLines, ...originBranch, ...proposal.introLines];
      break;
    case 'after':
      currentScene = committed?.record.linkedProposalChoiceId ? proposal : scene;
      line = afterLines[phase.i] ?? null;
      seen = [...scene.introLines, ...(committed?.record.linkedProposalChoiceId ? [...originBranch, ...proposal.introLines] : []), ...afterLines.slice(0, phase.i + 1)];
      break;
    default:
      seen = [...scene.introLines, ...originBranch, ...(propChoice ? [...proposal.introLines, ...propBranch] : [])];
  }
  const expression = lastExpression(seen, princessSpeaker);
  const seenIds = seen.map((l) => l.id);
  const stageLocation = sceneLocation(currentScene.sceneId, location, seenIds);
  const cg = sceneShowsCg(currentScene.sceneId);
  const history = line ? seen.slice(0, -1) : seen;

  // ---- transitions ---------------------------------------------------------
  const next = () => {
    if (busy.current) return;
    switch (phase.k) {
      case 'intro': {
        const i = phase.i + 1;
        if (i < scene.introLines.length) {
          setPhase({ k: 'intro', i });
          saveDraft({ stage: 'intro', progressLineIndex: i });
        } else {
          setPhase({ k: 'choice' });
          saveDraft({ stage: 'intro', progressLineIndex: scene.introLines.length });
        }
        break;
      }
      case 'branch': {
        const i = phase.i + 1;
        if (i < originBranch.length) {
          setPhase({ k: 'branch', i });
          saveDraft({ stage: 'branch', progressLineIndex: i });
        } else setPhase({ k: 'linkNotice' });
        break;
      }
      case 'linkNotice':
        setPhase({ k: 'pIntro', i: 0 });
        saveDraft({ stage: 'linked_proposal', progressLineIndex: 0 });
        break;
      case 'pIntro': {
        const i = phase.i + 1;
        if (i < proposal.introLines.length) {
          setPhase({ k: 'pIntro', i });
          saveDraft({ stage: 'linked_proposal', progressLineIndex: i });
        } else {
          setPhase({ k: 'pChoice' });
          saveDraft({ stage: 'linked_proposal', progressLineIndex: proposal.introLines.length });
        }
        break;
      }
      case 'after': {
        const i = phase.i + 1;
        if (i < afterLines.length) setPhase({ k: 'after', i });
        else setPhase({ k: 'result' });
        break;
      }
    }
  };

  const chooseOrigin = (o: ChoiceOption) => {
    if (busy.current || readOnly) return;
    setOrigin(o);
    const proj = encounter === 'ordinary' || encounter === 'optional' ? projectEarning(startRun, o.netHalfHearts) : null;
    if (proj?.linkedProposal) {
      setPhase({ k: 'branch', i: 0 });
      saveDraft({ stage: 'branch', progressLineIndex: 0, selectedOriginChoiceId: o.choiceId });
    } else void doCommit(o, null);
  };
  const chooseProposal = (o: ChoiceOption) => {
    if (busy.current || readOnly || !origin) return;
    setPropChoice(o);
    void doCommit(origin, o);
  };

  // ---- render --------------------------------------------------------------
  const title = displayTitle(currentScene.title);
  const kindLabel =
    encounter === 'ordinary' ? 'Conversation' : encounter === 'optional' ? 'Special moment' : encounter === 'proposal_retry' ? 'Proposal' : 'Pivotal moment';

  return (
    <main className="scene" data-testid="encounter" data-scene-id={currentScene.sceneId} data-phase={phase.k}>
      <div className="scene__title">
        <span className="scene__kind">{kindLabel}</span>
        <h2>{title}</h2>
      </div>
      <Stage location={stageLocation} princess={cg ? null : { route: run.route, expression }} cg={cg} />
      {line && (phase.k === 'intro' || phase.k === 'branch' || phase.k === 'pIntro' || phase.k === 'after') && (
        <Dialogue line={line} playerName={run.playerName} onContinue={next} continueLabel={supportString('UI-MOBILE-01')} history={history} />
      )}
      {phase.k === 'choice' && (
        <Choices options={scene.options} playerName={run.playerName} onChoose={chooseOrigin} busy={readOnly} prompt={supportString('UI-MOBILE-02')} />
      )}
      {phase.k === 'pChoice' && (
        <Choices options={proposal.options} playerName={run.playerName} onChoose={chooseProposal} busy={readOnly} prompt={supportString('UI-MOBILE-02')} />
      )}
      {phase.k === 'linkNotice' && (
        <section className="dock dock--notice" role="status">
          <p>{supportString('TXT-FIN-PENDING')}</p>
          <div className="dock__actions">
            <button type="button" className="btn btn--primary" onClick={next} autoFocus>
              {supportString('UI-MOBILE-01')}
            </button>
          </div>
        </section>
      )}
      {phase.k === 'committing' && (
        <section className="dock dock--notice" role="status" aria-busy="true">
          <p>Saving your answer…</p>
        </section>
      )}
      {phase.k === 'commitError' && (
        <section className="dock dock--error" role="alert">
          <h3>{(ERROR_TEXT as Record<string, { title: string; body: string }>)[phase.code]?.title ?? 'That action was not saved'}</h3>
          <p>{(ERROR_TEXT as Record<string, { title: string; body: string }>)[phase.code]?.body ?? `The game refused the action (${phase.code}). No time passed and nothing was awarded.`}</p>
          <div className="row">
            {origin && phase.code !== 'ERR_CONTENT_MISSING' && (
              <button type="button" className="btn btn--primary" onClick={() => void doCommit(origin, propChoice)}>
                Try saving again
              </button>
            )}
            <button type="button" className="btn" onClick={abandon}>
              Leave without answering (no cost)
            </button>
          </div>
        </section>
      )}
      {phase.k === 'result' && committed && <Outcome record={committed.record} state={committed.state} onDone={() => onExit({ committed: true, state: committed.state, record: committed.record })} />}
      {!committed && phase.k !== 'committing' && phase.k !== 'commitError' && (
        <div className="scene__leave">
          <button type="button" className="btn btn--quiet" onClick={abandon}>
            Leave conversation (no time passes)
          </button>
        </div>
      )}
    </main>
  );
}

/** Truthful outcome summary using the approved TXT-* copy, adapted only where a
 *  number in it would be false because of a cap (CONTENT_INTEGRATION). */
export function Outcome({ record, state, onDone }: { record: JournalRecord; state: RunState; onDone: () => void }) {
  const delta = record.heartsAfterHalf - record.heartsBeforeHalf;
  const parts: string[] = [];
  if (record.kind === 'ordinary' || record.kind === 'optional') {
    const scene = getScene(record.sceneIdOrActivityId ?? '');
    const opt = scene?.options.find((o) => o.choiceId === record.selectedChoiceId);
    const key = opt?.outcomeClass === 'correct' ? 'TXT-MEET-CORRECT' : opt?.outcomeClass === 'offensive' ? 'TXT-MEET-OFFENSIVE' : 'TXT-MEET-WRONG';
    const txt = supportString(key);
    if (opt && delta === opt.netHalfHearts) parts.push(txt);
    else {
      const sign = delta > 0 ? '+' : delta < 0 ? '−' : '+';
      parts.push(`${txt.split(' Relationship change:')[0]} Relationship change applied: ${sign}${heartsText(Math.abs(delta))} heart${delta === 0 ? ' (cap reached, no change)' : ''}.`);
    }
    if (record.midpointBeforeAfter[0] === 'locked' && record.midpointBeforeAfter[1] === 'pending') parts.push(supportString('TXT-AT-CAP'));
    if (record.linkedProposalChoiceId && state.outcome !== 'won') parts.push(help('HD-HELP-FIN_RETRY'));
  } else if (record.kind === 'midpoint' || record.kind === 'midpoint_retry') {
    parts.push(record.midpointBeforeAfter[1] === 'completed' ? 'Milestone complete. Your relationship has moved past the five-heart gate.' : help('HD-HELP-MID_RETRY'));
  } else if (record.kind === 'proposal_retry' && state.outcome !== 'won') {
    parts.push(help('HD-HELP-FIN_RETRY'));
  }
  if (state.outcome === 'failed') parts.push(supportString('UI-FAIL-01'));
  return (
    <section className="dock dock--result" role="status" data-testid="outcome">
      {parts.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <p className="muted">
        Hearts: {heartsText(record.heartsBeforeHalf)} → <strong>{heartsText(record.heartsAfterHalf)}</strong> of 10.{' '}
        {state.outcome === 'active' && `Now Day ${state.day}, ${state.slot}.`}
      </p>
      <div className="dock__actions">
        <button type="button" className="btn btn--primary" onClick={onDone} autoFocus>
          {state.outcome === 'won' ? `Continue to ${ROUTE_NAME[state.route]}’s ending` : state.outcome === 'failed' ? 'Continue' : 'Return to town'}
        </button>
      </div>
    </section>
  );
}
