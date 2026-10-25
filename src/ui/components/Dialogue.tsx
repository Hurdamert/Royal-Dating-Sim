// Dialogue dock: one authored line at a time with a speaker label, a Continue
// control (click/Enter/Space), and the authored choice list. New lines are
// announced through a polite live region without re-reading the page.
import { useEffect, useRef } from 'react';
import type { ScriptLine, ChoiceOption } from '../../content/types';
import { RichText, plainText } from '../RichText';
import { titleCase } from '../labels';

export function speakerLabel(speaker: string, playerName: string): string | null {
  if (speaker === 'NARRATOR') return null;
  if (speaker === 'PLAYER') return playerName;
  return titleCase(speaker);
}

export function DialogueLine({ line, playerName }: { line: ScriptLine; playerName: string }) {
  const who = speakerLabel(line.speaker, playerName);
  return (
    <div className={`line${who ? '' : ' line--narration'}${line.speaker === 'PLAYER' ? ' line--player' : ''}`} data-line-id={line.id}>
      {who && <div className="line__speaker">{who}</div>}
      <p className="line__text">
        <RichText text={line.text} playerName={playerName} />
      </p>
    </div>
  );
}

export function Dialogue({
  line,
  playerName,
  onContinue,
  continueLabel = 'Continue',
  busy = false,
  history,
}: {
  line: ScriptLine;
  playerName: string;
  onContinue: () => void;
  continueLabel?: string;
  busy?: boolean;
  history?: ScriptLine[];
}) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    btn.current?.focus({ preventScroll: true });
  }, [line.id]);
  const who = speakerLabel(line.speaker, playerName);
  return (
    <section className="dock" aria-label="Dialogue" data-testid="dialogue">
      {history && history.length > 0 && (
        <details className="transcript">
          <summary>Scene transcript ({history.length} earlier line{history.length === 1 ? '' : 's'})</summary>
          <ol>
            {history.map((l) => (
              <li key={l.id}>
                <DialogueLine line={l} playerName={playerName} />
              </li>
            ))}
          </ol>
        </details>
      )}
      <div className="dock__line" onClick={() => !busy && onContinue()}>
        <DialogueLine line={line} playerName={playerName} />
      </div>
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        {who ? `${who}: ` : ''}
        {plainText(line.text, playerName)}
      </div>
      <div className="dock__actions">
        <button ref={btn} type="button" className="btn btn--primary btn--continue" onClick={onContinue} disabled={busy} data-testid="continue">
          {continueLabel}
        </button>
      </div>
    </section>
  );
}

export function Choices({
  options,
  playerName,
  onChoose,
  busy,
  prompt,
}: {
  options: ChoiceOption[];
  playerName: string;
  onChoose: (o: ChoiceOption) => void;
  busy: boolean;
  prompt: string;
}) {
  const first = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    first.current?.focus({ preventScroll: true });
  }, []);
  return (
    <section className="dock dock--choices" aria-label="Choose a response" data-testid="choices">
      <h3 className="dock__prompt">{prompt}</h3>
      <ol className="choices">
        {options.map((o, i) => (
          <li key={o.choiceId}>
            <button
              ref={i === 0 ? first : undefined}
              type="button"
              className="btn choice"
              disabled={busy}
              onClick={() => onChoose(o)}
              data-choice-index={options.indexOf(o)}
            >
              <span className="choice__num" aria-hidden="true">
                {i + 1}
              </span>
              <span className="choice__text">
                <RichText text={o.labelText} playerName={playerName} />
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
