// "How it works": a short, skippable first-run tutorial (owner request
// 2026-10-25). It explains the goal and the basic loop in six cards and costs no
// game time. It plays once after the prologue of the first run in this browser,
// and can be replayed from the title screen and from Help.
import { useEffect, useRef, useState } from 'react';
import type { Route } from '../../core/model';
import { ROUTE_SPECS } from '../../core/schedule';
import { LOCATION_NAME, ROUTE_NAME, STAT_NAME } from '../labels';

const SEEN_KEY = 'royal-exceptions:tutorial-seen';

/** Per-browser convenience flag; the tutorial is always replayable, so losing it is harmless. */
export function tutorialSeen(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}
function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage unavailable: the tutorial will simply offer itself again */
  }
}

export interface TutorialStep {
  id: string;
  glyph: string;
  title: string;
  body: string[];
  /** Humpty's aside: flavour, never needed to understand the rule. */
  aside?: string;
}

export function tutorialSteps(route: Route | null): TutorialStep[] {
  const her = route ? ROUTE_NAME[route] : 'your princess';
  const Her = route ? ROUTE_NAME[route] : 'Your princess';
  const spec = route ? ROUTE_SPECS[route] : null;
  const where = spec ? [...new Set(Object.values(spec.meeting).flatMap((d) => Object.values(d)))].map((l) => LOCATION_NAME[l]) : null;
  const skills = spec ? `For ${her}, that means ${STAT_NAME[spec.primary]} and ${STAT_NAME[spec.secondary]}.` : 'Each princess needs a different pair.';
  return [
    {
      id: 'goal',
      glyph: '♥',
      title: 'The goal',
      body: [`Win ${her}’s heart before the royal courtship season ends. You have 28 days.`, 'Fill her heart meter to 10 and the conversation turns to a proposal. Say the right thing, and there is a wedding.'],
      aside: 'Simple. So was my wall.',
    },
    {
      id: 'time',
      glyph: '◷',
      title: 'Days and time',
      body: ['Every day has a morning, an afternoon and an evening.', 'Talking to her, training and resting each use up the current time slot. Walking around town, reading the calendar and opening menus are free.'],
    },
    {
      id: 'find',
      glyph: '★',
      title: `Finding ${her}`,
      body: [
        `${Her} keeps a weekly schedule${where ? ` at the ${where.join(', the ').replace(/, the ([^,]*)$/, ' and the $1')}` : ''}.`,
        'A ★ on the town map shows where she is right now. The Calendar shows her whole week. You can talk to her once a day.',
      ],
      aside: 'Turning up at an empty quay is a classic. I have done it twice. Once on purpose.',
    },
    {
      id: 'talk',
      glyph: '❝',
      title: 'Talking',
      body: ['Each conversation ends with a choice of replies. The best one answers what she actually said, so listen to her.', 'A good answer is worth 1 heart. A well-meant miss is worth ½. A rude one costs ½.'],
      aside: 'Being charming is optional. Paying attention is not.',
    },
    {
      id: 'train',
      glyph: '✦',
      title: 'Training',
      body: [
        'Train Charisma, Intelligence, Strength and Kindness at places around town. Each place offers its own activities.',
        `At 5 hearts, your story pauses for a big moment that needs two skills trained. ${skills} The game shows how close you are.`,
      ],
    },
    {
      id: 'save',
      glyph: '✓',
      title: 'Saving, and the rest',
      body: [
        'The game saves on this device after every action. Use Save & backup to download a copy you can keep.',
        'Now and then a special one-time moment appears. You do not need every one of them to win. Help is always in the top bar.',
      ],
      aside: 'Go on. I will be in the Town Square if you need me. I am always in the Town Square.',
    },
  ];
}

export function Tutorial({ route, onDone, doneLabel }: { route: Route | null; onDone: () => void; doneLabel: string }) {
  const steps = tutorialSteps(route);
  const [i, setI] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const step = steps[i]!;
  const last = i === steps.length - 1;
  const finish = () => {
    markSeen();
    onDone();
  };
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [i]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !last) setI((n) => n + 1);
      if (e.key === 'ArrowLeft' && i > 0) setI((n) => n - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, last]);
  return (
    <main className="tutorial panel" data-testid="tutorial" data-step={step.id} aria-labelledby="tutorial-title">
      <p className="tutorial__kicker">
        How it works · {i + 1} of {steps.length}
      </p>
      <div className="tutorial__card">
        <span className="tutorial__glyph" aria-hidden="true">
          {step.glyph}
        </span>
        <h1 id="tutorial-title" ref={heading} tabIndex={-1}>
          {step.title}
        </h1>
        {step.body.map((p, k) => (
          <p key={k}>{p}</p>
        ))}
        {step.aside && (
          <p className="tutorial__aside">
            <span className="line__speaker">Humpty</span> “{step.aside}”
          </p>
        )}
      </div>
      <ol className="tutorial__dots" aria-hidden="true">
        {steps.map((s, k) => (
          <li key={s.id} className={k === i ? 'is-current' : k < i ? 'is-done' : ''} />
        ))}
      </ol>
      <div className="row tutorial__nav">
        <button type="button" className="btn" onClick={() => setI(i - 1)} disabled={i === 0}>
          Back
        </button>
        {last ? (
          <button type="button" className="btn btn--primary" onClick={finish} data-testid="tutorial-done">
            {doneLabel}
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={() => setI(i + 1)} data-testid="tutorial-next">
            Next
          </button>
        )}
        {!last && (
          <button type="button" className="btn btn--quiet" onClick={finish} data-testid="tutorial-skip">
            Skip tutorial
          </button>
        )}
      </div>
    </main>
  );
}
