// Stage compositions in background-pixel coordinates (all backgrounds are
// 1672×941). A composition crops the approved background (desktop and phone
// variants, both 16:9), places the approved sprite, and optionally redraws the
// approved background's own pixels on top of the sprite inside a polygon — the
// "foreground water occlusion derived only from bg pixels" required for
// Nerelle (UX_ACCESSIBILITY.md, option 1). No new art is created.
import type { LocationId, Route } from '../core/model';

export const BG_W = 1672;
export const BG_H = 941;
const SPRITE_ASPECT = 1024 / 1536;

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface SpritePlacement {
  /** Sprite height in background pixels. */
  height: number;
  /** Horizontal centre in background pixels. */
  cx: number;
  /** Top edge in background pixels. */
  top: number;
}
export interface Composition {
  crop: Rect;
  cropPhone: Rect;
  sprite: SpritePlacement;
  /** Polygon (bg px) where the background is redrawn over the sprite. */
  occluder: [number, number][] | null;
  /** Optional readable location label override, e.g. "Royal Gardens — Canal". */
  label: string | null;
  waterborne: boolean;
}

const FULL: Rect = { x: 0, y: 0, w: BG_W, h: BG_H };

/** Tavri and Kaedra: waist-up sprite right of centre; phone crop is a close-up. */
const STANDARD: Composition = {
  crop: FULL,
  cropPhone: { x: 680, y: 40, w: 900, h: 506 },
  sprite: { height: 1000, cx: 1130, top: 50 },
  occluder: null,
  label: null,
  waterborne: false,
};

/** Nerelle in the Royal Gardens canal at screen-right, waist-deep behind the embankment. */
const NERELLE_GARDENS: Composition = {
  crop: { x: 672, y: 379, w: 1000, h: 562 },
  cropPhone: { x: 992, y: 385, w: 680, h: 382 },
  sprite: { height: 420, cx: 1572, top: 630 - 0.56 * 420 },
  occluder: [
    [1300, 470],
    [1452, 470],
    [1452, 628],
    [1560, 640],
    [1672, 655],
    [1672, 941],
    [1300, 941],
  ],
  label: 'Royal Gardens — Canal',
  waterborne: true,
};

/** Nerelle in open water at Moonwater Quay, waist-deep. */
const NERELLE_QUAY: Composition = {
  crop: { x: 572, y: 322, w: 1100, h: 619 },
  cropPhone: { x: 780, y: 330, w: 640, h: 360 },
  sprite: { height: 480, cx: 1110, top: 640 - 0.56 * 480 },
  occluder: [
    [700, 640],
    [1672, 640],
    [1672, 941],
    [700, 941],
  ],
  label: null,
  waterborne: true,
};

/**
 * Composition for a princess at a location. Nerelle is only ever scheduled at
 * the Quay and the Gardens canal; anywhere else (never expected) returns null so
 * the caller falls back to the non-diegetic framed bust instead of an upright sprite.
 */
export function compositionFor(route: Route, location: LocationId): Composition | null {
  if (route === 'NER') {
    if (location === 'royal_gardens') return NERELLE_GARDENS;
    if (location === 'moonwater_quay') return NERELLE_QUAY;
    return null;
  }
  return STANDARD;
}

export function backgroundOnly(): Composition {
  return { ...STANDARD, cropPhone: FULL };
}

export function spriteWidth(p: SpritePlacement): number {
  return p.height * SPRITE_ASPECT;
}

const pct = (v: number) => `${+v.toFixed(4)}%`;

/** CSS custom properties positioning the "world" layer for a crop. */
export function cropVars(c: Rect, prefix: string): Record<string, string> {
  return {
    [`--${prefix}w`]: pct((BG_W / c.w) * 100),
    [`--${prefix}h`]: pct((BG_H / c.h) * 100),
    [`--${prefix}l`]: pct((-c.x / c.w) * 100),
    [`--${prefix}t`]: pct((-c.y / c.h) * 100),
  };
}

export function spriteStyle(p: SpritePlacement): Record<string, string> {
  const w = spriteWidth(p);
  return {
    left: pct(((p.cx - w / 2) / BG_W) * 100),
    top: pct((p.top / BG_H) * 100),
    width: pct((w / BG_W) * 100),
    height: pct((p.height / BG_H) * 100),
  };
}

export function polygonClip(points: [number, number][]): string {
  return `polygon(${points.map(([x, y]) => `${pct((x / BG_W) * 100)} ${pct((y / BG_H) * 100)}`).join(', ')})`;
}
