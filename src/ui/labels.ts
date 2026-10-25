// Display labels and image metadata (UI copy, not story content).
import type { Expression } from '../content/types';
import type { LocationId, Route, Slot, Stat } from '../core/model';

export const ROUTE_NAME: Record<Route, string> = { TAV: 'Tavri', NER: 'Nerelle', KAE: 'Kaedra' };
/** One-line route pitches on the New Run screen. */
export const ROUTE_TAGLINE: Record<Route, string> = {
  TAV: 'The fox princess. Has a joke ready for everything, especially the things that bother her.',
  NER: 'The mermaid princess. Studying the surface world, one baffling custom at a time.',
  KAE: 'The dragon princess. The court is a little afraid of her. She is mostly reading safety reports.',
};
export const ROUTE_FILE: Record<Route, string> = { TAV: 'tavri', NER: 'nerelle', KAE: 'kaedra' };
export const LOCATION_NAME: Record<LocationId, string> = {
  home: 'Home',
  town_square: 'Town Square',
  royal_library: 'Royal Library',
  adventurers_guild: 'Adventurers’ Guild',
  palace_court: 'Palace Court',
  royal_gardens: 'Royal Gardens',
  moonwater_quay: 'Moonwater Quay',
};

export const LOCATION_ALT: Record<LocationId, string> = {
  home: 'A modest rented room with books, a small desk, an exercise mat and an old window.',
  town_square: 'A friendly old-town plaza with cobbles, a fountain and market stalls.',
  royal_library: 'An airy palace library with towering shelves, reading desks and tall windows.',
  adventurers_guild: 'A timber and stone guildhall with padded training space and practice targets.',
  palace_court: 'A stately royal courtyard with a ceremonial dais, limestone arches and banners.',
  royal_gardens: 'A sunlit garden terrace with flowering arches, a bench, and a canal along the right.',
  moonwater_quay: 'A stone quay with steps down to broad water, moored boats and a distant palace coast.',
};

export const STAT_NAME: Record<Stat, string> = { charisma: 'Charisma', intelligence: 'Intelligence', strength: 'Strength', kindness: 'Kindness' };
export const SLOT_NAME: Record<Slot, string> = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' };
export const WEEKDAY_NAME: Record<string, string> = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };

export const EXPRESSION_FILE: Record<Expression, string> = {
  NEUTRAL: 'neutral',
  PLAYFUL: 'playful',
  WORRIED: 'worried',
  ANNOYED: 'annoyed',
  SURPRISED: 'surprised',
};
const EXPRESSION_ALT: Record<Expression, string> = {
  NEUTRAL: 'with a calm expression',
  PLAYFUL: 'smiling playfully',
  WORRIED: 'looking worried',
  ANNOYED: 'looking annoyed',
  SURPRISED: 'looking surprised',
};

export const art = {
  background: (l: LocationId) => `/art/bg_${l}.webp`,
  sprite: (r: Route, e: Expression) => `/art/${ROUTE_FILE[r]}_${ROUTE_FILE[r]}_${EXPRESSION_FILE[e]}.webp`,
  cg: (r: Route) => `/art/${{ TAV: 'tavri_tavri_private_confession', NER: 'nerelle_nerelle_forbidden_journey', KAE: 'kaedra_kaedra_royal_trial' }[r]}.webp`,
};

export function spriteAlt(r: Route, e: Expression): string {
  return `${ROUTE_NAME[r]} ${EXPRESSION_ALT[e]}.`;
}
export const CG_ALT: Record<Route, string> = {
  TAV: 'Illustration: Tavri by the fountain in the Royal Gardens at night, one hand at her collar.',
  NER: 'Illustration: Nerelle resting at the water’s edge under a full moon, the city lit behind her.',
  KAE: 'Illustration: Kaedra, silver-haired, at a palace ceremony with a small spark of light at her hand.',
};

/** Hearts are stored as half-units; display 0.0–10.0. */
export function heartsText(half: number): string {
  return (half / 2).toFixed(1);
}

export function titleCase(speaker: string): string {
  return speaker
    .toLowerCase()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Strip editorial parentheticals from authored scene headings for display. */
export function displayTitle(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*$/, '').replace(/^Marriage epilogue:\s*/, '');
}
