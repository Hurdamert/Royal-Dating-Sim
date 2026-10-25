// Typed access to the compiled static content registry.
import contentJson from '../content/generated/content.json';
import type { ContentBundle, Scene, ChoiceOption } from '../content/types';
import type { Route, Stage } from './model';

export const CONTENT = contentJson as unknown as ContentBundle;

export function getScene(id: string): Scene | undefined {
  return CONTENT.scenes[id];
}

export function requireScene(id: string): Scene {
  const s = CONTENT.scenes[id];
  if (!s) throw new Error(`ERR_CONTENT_MISSING: ${id}`);
  return s;
}

export function findOption(scene: Scene, choiceId: string): ChoiceOption | undefined {
  return scene.options.find((o) => o.choiceId === choiceId);
}

/** Deterministic ordinary pool: U01..U06 once, then F01,F02,F03 repeating (§7). */
export function ordinarySceneId(route: Route, stage: Stage, cursor: number): string {
  const suffix = cursor < 6 ? `U0${cursor + 1}` : `F0${((cursor - 6) % 3) + 1}`;
  return `${route}-ORD-${stage}-${suffix}`;
}

export const sceneIds = {
  midpoint: (r: Route) => `${r}-MID-01`,
  midpointRetry: (r: Route) => `${r}-MID-RETRY-01`,
  proposal: (r: Route) => `${r}-FIN-01`,
  proposalRetry: (r: Route) => `${r}-FIN-RETRY-01`,
  epilogue: (r: Route) => `${r}-EPI-01`,
  prologue: 'CORE-PRO-01',
  failure: 'CORE-FAIL-01',
} as const;

export function supportString(id: string): string {
  const s = CONTENT.support.strings[id];
  if (s === undefined) throw new Error(`ERR_CONTENT_MISSING: ${id}`);
  return s;
}
