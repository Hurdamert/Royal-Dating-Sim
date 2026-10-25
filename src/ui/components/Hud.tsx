// Top heads-up display: route, day/weekday/slot, half-heart meter, four stats
// with partial-session indicators, and the precise save status.
import { useState } from 'react';
import type { RunState } from '../../core/model';
import { STATS } from '../../core/model';
import { weekdayOf } from '../../core/schedule';
import { heartCap } from '../../core/engine';
import type { SessionSnapshot } from '../../persistence/session';
import { heartsText, ROUTE_NAME, SLOT_NAME, STAT_NAME, WEEKDAY_NAME } from '../labels';

export function Hearts({ half, capHalf }: { half: number; capHalf: number }) {
  const cells = Array.from({ length: 10 }, (_, i) => {
    const v = half - i * 2;
    return v >= 2 ? 'full' : v === 1 ? 'half' : 'empty';
  });
  return (
    <span className="hearts" role="img" aria-label={`${heartsText(half)} of 10 hearts${capHalf < 20 ? ', capped at 5 until the midpoint' : ''}`}>
      <span className="hearts__icons" aria-hidden="true">
        {cells.map((c, i) => (
          <span key={i} className={`heart heart--${c}${i * 2 >= capHalf ? ' heart--locked' : ''}`} />
        ))}
      </span>
      <span className="hearts__num" aria-hidden="true">
        {heartsText(half)}
      </span>
    </span>
  );
}

export function SaveStatus({ snap }: { snap: SessionSnapshot }) {
  let text: string;
  let tone: string;
  if (snap.access === 'read_only') [text, tone] = ['Read-only (open in another tab)', 'warn'];
  else if (snap.access === 'unsupported') [text, tone] = ['Read-only (saving unavailable)', 'warn'];
  else if (snap.access === 'storage_unavailable') [text, tone] = ['Not saving', 'bad'];
  else if (snap.saveStatus === 'saving') [text, tone] = ['Saving…', 'neutral'];
  else if (snap.saveStatus === 'error') [text, tone] = ['Last action NOT saved', 'bad'];
  else [text, tone] = ['Saved locally', 'good'];
  const [head, ...rest] = text.split(' ');
  return (
    <span className={`save-status save-status--${tone}`} data-testid="save-status">
      {tone === 'good' ? (
        <>
          {head}
          <span className="save-status__more"> {rest.join(' ')}</span>
        </>
      ) : (
        text
      )}
    </span>
  );
}

const SHORT: Record<string, string> = { charisma: 'Cha', intelligence: 'Int', strength: 'Str', kindness: 'Kin' };

export function Hud({ run, snap, onMenu }: { run: RunState; snap: SessionSnapshot; onMenu: (m: 'calendar' | 'journal' | 'help' | 'save' | 'title') => void }) {
  const wd = weekdayOf(run.day);
  const [open, setOpen] = useState(false);
  const pick = (m: 'calendar' | 'journal' | 'help' | 'save' | 'title') => {
    setOpen(false);
    onMenu(m);
  };
  return (
    <header className={`hud hud--${run.route.toLowerCase()}`} data-testid="hud">
      <div className="hud__row">
        <div className="hud__where">
          <span className="hud__route">
            {ROUTE_NAME[run.route]}
            <span className="hud__route-suffix">’s route</span>
          </span>
          <span className="hud__time" aria-label={`Day ${run.day} of 28, ${WEEKDAY_NAME[wd]}, ${SLOT_NAME[run.slot]}`}>
            <strong>Day {run.day}</strong>/28 · {wd} · {SLOT_NAME[run.slot]}
          </span>
        </div>
        <SaveStatus snap={snap} />
      </div>
      <div className="hud__row hud__row--sub">
        <Hearts half={run.heartsHalf} capHalf={heartCap(run)} />
        <ul className="stats" aria-label="Stats">
          {STATS.map((s) => (
            <li key={s} className="stat">
              <span className="stat__name">
                <span className="stat__long">{STAT_NAME[s]}</span>
                <abbr className="stat__short" title={STAT_NAME[s]}>
                  {SHORT[s]}
                </abbr>
              </span>{' '}
              <span className="stat__val">{run.stats[s]}</span>
              {run.trainingPartial[s] === 1 && (
                <span className="stat__partial" title="One more session completes the next level">
                  <span aria-hidden="true">+½</span>
                  <span className="visually-hidden">(one session toward the next level)</span>
                </span>
              )}
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn--small hud__menu-toggle" aria-expanded={open} aria-controls="hud-menu" onClick={() => setOpen(!open)}>
          Menu
        </button>
        <nav id="hud-menu" className={`hud__menu${open ? ' is-open' : ''}`} aria-label="Game menu">
          {(
            [
              ['calendar', 'Calendar'],
              ['journal', 'Journal'],
              ['help', 'Help'],
              ['save', 'Save & backup'],
              ['title', 'Title'],
            ] as const
          ).map(([k, label]) => (
            <button key={k} type="button" className="btn btn--small" onClick={() => pick(k)}>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
