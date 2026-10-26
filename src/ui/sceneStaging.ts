// Background choices for pivotal scenes, taken only from each scene's own
// authored **Location:** note and explicit narrative cue lines (CONTENT_INTEGRATION
// "Optional and milestone story locations"). Everything else stays at the
// encounter's scheduled location. Midpoint first attempts show their approved CG.
import type { LocationId, Route } from '../core/model';
import sennaRoute from '../../content/routes/SEN/ROUTE.json';

interface Cue {
  start: LocationId | 'scheduled';
  /** From this authored line ID onward, show this location. */
  switches?: { fromLineId: string; location: LocationId }[];
}

const CUES: Record<string, Cue> = {
  // "Location: Royal Gardens, reached within the originating encounter as an event transition."
  'TAV-FIN-01': { start: 'royal_gardens' },
  // "Location: Palace Court followed by Royal Gardens" — TAV-EPI-012 "Later in the gardens…"
  'TAV-EPI-01': { start: 'palace_court', switches: [{ fromLineId: 'TAV-EPI-012', location: 'royal_gardens' }] },
  // "Location: Moonwater Quay … optional cut to the Royal Gardens canal" — NER-EPI-017 "Later, beside the Gardens canal…"
  'NER-EPI-01': { start: 'moonwater_quay', switches: [{ fromLineId: 'NER-EPI-017', location: 'royal_gardens' }] },
  // "Location: Existing Palace Court, with a quieter final moment beside the Royal Gardens" — KAE-EPI-012 "Later, in the Royal Gardens…"
  'KAE-EPI-01': { start: 'palace_court', switches: [{ fromLineId: 'KAE-EPI-012', location: 'royal_gardens' }] },
  // Senna (owner-requested route): her scenes' locations are set in content/routes/SEN/ROUTE.json.
  ...(sennaRoute.staging as Record<string, Cue>),
};

export function sceneLocation(sceneId: string, scheduled: LocationId, seenLineIds: readonly string[]): LocationId {
  const cue = CUES[sceneId];
  if (!cue) return scheduled;
  let loc: LocationId = cue.start === 'scheduled' ? scheduled : cue.start;
  for (const s of cue.switches ?? []) if (seenLineIds.includes(s.fromLineId)) loc = s.location;
  return loc;
}

export function sceneShowsCg(sceneId: string): Route | null {
  const m = /^(TAV|NER|KAE|SEN)-MID-01$/.exec(sceneId);
  return m ? (m[1] as Route) : null;
}

export const PRINCESS_SPEAKER: Record<Route, string> = { TAV: 'TAVRI', NER: 'NERELLE', KAE: 'KAEDRA', SEN: 'SENNA' };
