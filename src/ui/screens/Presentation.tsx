// Display-only scenes: shared prologue, marriage epilogues, shared failure.
// They never commit anything and can be replayed read-only from the gallery.
import { useState } from 'react';
import type { LocationId, Route } from '../../core/model';
import { requireScene, supportString } from '../../core/content';
import { Stage } from '../components/Stage';
import { Dialogue } from '../components/Dialogue';
import { PRINCESS_SPEAKER, sceneLocation } from '../sceneStaging';
import { displayTitle } from '../labels';
import type { Expression } from '../../content/types';

export function Presentation({
  sceneId,
  route,
  playerName,
  location,
  onDone,
  doneLabel,
  replay = false,
}: {
  sceneId: string;
  route: Route | null;
  playerName: string;
  location: LocationId;
  onDone: () => void;
  doneLabel: string;
  replay?: boolean;
}) {
  const scene = requireScene(sceneId);
  const [i, setI] = useState(0);
  const lines = scene.introLines;
  const line = lines[Math.min(i, lines.length - 1)]!;
  const seen = lines.slice(0, i + 1);
  let expr: Expression = 'NEUTRAL';
  if (route) for (const l of seen) if (l.speaker === PRINCESS_SPEAKER[route] && l.expression) expr = l.expression;
  const loc = sceneLocation(sceneId, location, seen.map((l) => l.id));
  const last = i >= lines.length - 1;
  const princessOnStage = route && scene.kind === 'epilogue' ? { route, expression: expr } : null;
  return (
    <main className="scene" data-testid="presentation" data-scene-id={sceneId}>
      <div className="scene__title">
        <span className="scene__kind">{scene.kind === 'epilogue' ? 'Ending' : scene.sceneId === 'CORE-FAIL-01' ? 'Ending' : 'Prologue'}</span>
        <h2>{scene.kind === 'epilogue' ? displayTitle(scene.title) : scene.sceneId === 'CORE-FAIL-01' ? 'The Courtship Window Closes' : 'Royal Exceptions'}</h2>
        {replay && <span className="badge">Replay · nothing is saved</span>}
      </div>
      <Stage location={loc} princess={princessOnStage} cg={null} />
      <Dialogue
        line={line}
        playerName={playerName}
        history={seen.slice(0, -1)}
        continueLabel={last ? doneLabel : supportString('UI-MOBILE-01')}
        onContinue={() => (last ? onDone() : setI(i + 1))}
      />
    </main>
  );
}
