// Weekly schedules, stat requirements and training activities, read from the
// handoff's machine-readable route_schedules_and_training.json.
import scheduleJson from '../../handoff/03_IMPLEMENTATION_BLUEPRINT/route_schedules_and_training.json';
import {
  LOCATIONS,
  ROUTES,
  SLOTS,
  STATS,
  WEEKDAYS,
  isLocation,
  type LocationId,
  type Route,
  type Slot,
  type Stat,
  type Weekday,
  type OptionalSceneId,
} from './model';

interface RawRoute {
  primary: string;
  secondary: string;
  meeting: Partial<Record<string, Partial<Record<string, string>>>>;
  optional_pre: { scene_id: string; stat: string; at_least: number };
  optional_post: { scene_id: string; stat: string; at_least: number };
}
interface RawSchedule {
  weekdays: string[];
  time_slots: string[];
  routes: Record<string, RawRoute>;
  activities: { id: string; location: string; stat: string }[];
  locations: string[];
}

const raw = scheduleJson as RawSchedule;

function asStat(v: string): Stat {
  if (!(STATS as readonly string[]).includes(v)) throw new Error(`Unknown stat in schedule: ${v}`);
  return v as Stat;
}

// Structural guard: the JSON must match the fixed vocabulary exactly.
if (JSON.stringify(raw.weekdays) !== JSON.stringify(WEEKDAYS)) throw new Error('Schedule weekdays mismatch');
if (JSON.stringify(raw.time_slots) !== JSON.stringify(SLOTS)) throw new Error('Schedule slots mismatch');
if (JSON.stringify(raw.locations) !== JSON.stringify(LOCATIONS)) throw new Error('Schedule locations mismatch');

export interface OptionalSpec {
  sceneId: OptionalSceneId;
  stat: Stat;
  atLeast: number;
}
export interface RouteSpec {
  route: Route;
  primary: Stat;
  secondary: Stat;
  /** meeting[weekday][slot] = location, only for scheduled cells. */
  meeting: Record<Weekday, Partial<Record<Slot, LocationId>>>;
  optionalPre: OptionalSpec;
  optionalPost: OptionalSpec;
}
export interface ActivitySpec {
  id: string;
  location: LocationId;
  stat: Stat;
}

export const ROUTE_SPECS: Record<Route, RouteSpec> = Object.fromEntries(
  ROUTES.map((r) => {
    const rr = raw.routes[r];
    if (!rr) throw new Error(`Schedule missing route ${r}`);
    const meeting = Object.fromEntries(WEEKDAYS.map((w) => [w, {}])) as Record<Weekday, Partial<Record<Slot, LocationId>>>;
    for (const [w, cells] of Object.entries(rr.meeting)) {
      if (!(WEEKDAYS as readonly string[]).includes(w)) throw new Error(`Bad weekday ${w}`);
      for (const [s, loc] of Object.entries(cells ?? {})) {
        if (!(SLOTS as readonly string[]).includes(s) || !isLocation(loc)) throw new Error(`Bad meeting cell ${r} ${w} ${s}`);
        meeting[w as Weekday][s as Slot] = loc;
      }
    }
    const opt = (o: RawRoute['optional_pre']): OptionalSpec => ({ sceneId: o.scene_id as OptionalSceneId, stat: asStat(o.stat), atLeast: o.at_least });
    return [r, { route: r, primary: asStat(rr.primary), secondary: asStat(rr.secondary), meeting, optionalPre: opt(rr.optional_pre), optionalPost: opt(rr.optional_post) }];
  }),
) as Record<Route, RouteSpec>;

export const ACTIVITIES: ActivitySpec[] = raw.activities.map((a) => {
  if (!isLocation(a.location)) throw new Error(`Bad activity location ${a.location}`);
  return { id: a.id, location: a.location, stat: asStat(a.stat) };
});
export const ACTIVITY_BY_ID: Record<string, ActivitySpec> = Object.fromEntries(ACTIVITIES.map((a) => [a.id, a]));

/** Midpoint requirements: primary ≥ 6, secondary ≥ 4 (COMPLETE_GAME_SPEC §4). */
export const MIDPOINT_PRIMARY = 6;
export const MIDPOINT_SECONDARY = 4;

export function weekdayOf(day: number): Weekday {
  return WEEKDAYS[(day - 1) % 7]!;
}

/** Where the route's princess is during this day/slot, or null if unavailable. */
export function meetingLocation(route: Route, day: number, slot: Slot): LocationId | null {
  return ROUTE_SPECS[route].meeting[weekdayOf(day)][slot] ?? null;
}

export function slotIndex(slot: Slot): number {
  return SLOTS.indexOf(slot);
}

/** 0-based time index: Day 1 morning = 0 … Day 28 evening = 83. */
export function timeIndex(day: number, slot: Slot): number {
  return (day - 1) * SLOTS.length + slotIndex(slot);
}

export function fromTimeIndex(i: number): { day: number; slot: Slot } {
  return { day: Math.floor(i / SLOTS.length) + 1, slot: SLOTS[i % SLOTS.length]! };
}
