// The illustrated scene stage: approved background, approved sprite (or the
// approved midpoint CG), and for Nerelle a foreground layer made of the same
// background's pixels that hides her below the waterline.
import { useState, type CSSProperties } from 'react';
import type { Expression } from '../../content/types';
import type { LocationId, Route } from '../../core/model';
import { art, CG_ALT, LOCATION_ALT, LOCATION_NAME, spriteAlt, ROUTE_NAME } from '../labels';
import { backgroundOnly, compositionFor, cropVars, polygonClip, spriteStyle } from '../staging';

export interface StageProps {
  location: LocationId;
  /** Princess shown on stage, if any. */
  princess: { route: Route; expression: Expression } | null;
  /** Show the route's midpoint CG instead of background + sprite. */
  cg: Route | null;
  /** Optional extra label (e.g. "Read-only preview"). */
  caption?: string;
}

function Img({ src, alt, className, style }: { src: string; alt: string; className: string; style?: CSSProperties }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className={`${className} img-fallback`} style={style} role="img" aria-label={alt}>
        <span>Image unavailable: {alt}</span>
      </div>
    );
  return <img src={src} alt={alt} className={className} style={style} onError={() => setFailed(true)} draggable={false} />;
}

export function Stage({ location, princess, cg, caption }: StageProps) {
  if (cg) {
    return (
      <figure className="stage stage--cg" data-testid="stage" data-stage="cg" data-route={cg}>
        <Img src={art.cg(cg)} alt={CG_ALT[cg]} className="stage__cg" />
        {caption && <figcaption className="stage__label">{caption}</figcaption>}
      </figure>
    );
  }
  const comp = princess ? compositionFor(princess.route, location) : backgroundOnly();
  const bgAlt = LOCATION_ALT[location];
  const label = comp?.label ?? LOCATION_NAME[location];

  // Safety net: a princess without an approved composition at this location is
  // shown as a non-diegetic framed bust beside the background (never upright on land).
  if (princess && !comp) {
    const c = backgroundOnly();
    return (
      <figure className="stage" data-testid="stage" data-stage="bust" data-route={princess.route}>
        <div className="stage__world" style={{ ...cropVars(c.crop, 'd'), ...cropVars(c.cropPhone, 'p') } as CSSProperties}>
          <Img src={art.background(location)} alt={bgAlt} className="stage__bg" />
        </div>
        <div className="stage__bust" aria-hidden={false}>
          <Img src={art.sprite(princess.route, princess.expression)} alt={spriteAlt(princess.route, princess.expression)} className="stage__bust-img" />
        </div>
        <figcaption className="stage__label">{label}</figcaption>
      </figure>
    );
  }

  const c = comp ?? backgroundOnly();
  const vars = { ...cropVars(c.crop, 'd'), ...cropVars(c.cropPhone, 'p') } as CSSProperties;
  return (
    <figure
      className="stage"
      data-testid="stage"
      data-stage={princess ? (c.waterborne ? 'waterborne' : 'standard') : 'empty'}
      data-route={princess?.route ?? ''}
      data-location={location}
    >
      <div className="stage__world" style={vars}>
        <Img src={art.background(location)} alt={bgAlt} className="stage__bg" />
        {princess && (
          <Img
            src={art.sprite(princess.route, princess.expression)}
            alt={`${spriteAlt(princess.route, princess.expression)}${c.waterborne ? ` She is in the water${location === 'royal_gardens' ? ' of the canal' : ''}.` : ''}`}
            className="stage__sprite"
            style={spriteStyle(c.sprite)}
          />
        )}
        {princess && c.occluder && (
          // Foreground made only of the approved background's own pixels.
          <img src={art.background(location)} alt="" aria-hidden="true" className="stage__occluder" style={{ clipPath: polygonClip(c.occluder) }} draggable={false} data-testid="occluder" />
        )}
      </div>
      <figcaption className="stage__label">
        {label}
        {princess && <span className="visually-hidden">, {ROUTE_NAME[princess.route]} is here</span>}
        {caption && <span className="stage__caption"> · {caption}</span>}
      </figcaption>
    </figure>
  );
}
