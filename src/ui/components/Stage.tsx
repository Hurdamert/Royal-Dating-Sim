// The illustrated scene stage: approved background, approved sprite (or the
// approved midpoint CG), and for Nerelle a foreground layer made of the same
// background's pixels that hides her below the waterline.
import { useCallback, useState, type CSSProperties } from 'react';
import type { Expression } from '../../content/types';
import type { LocationId, Route } from '../../core/model';
import { ERROR_TEXT } from '../../persistence/errors';
import { art, CG_ALT, LOCATION_ALT, LOCATION_NAME, spriteAlt, ROUTE_NAME } from '../labels';
import { backgroundOnly, compositionFor, cropVars, polygonClip, spriteStyle, type Composition } from '../staging';

export interface StageProps {
  location: LocationId;
  /** Princess shown on stage, if any. */
  princess: { route: Route; expression: Expression } | null;
  /** Show the route's midpoint CG instead of background + sprite. */
  cg: Route | null;
  /** Optional extra label (e.g. "Read-only preview"). */
  caption?: string;
}

function Img({
  src,
  alt,
  className,
  style,
  onSettled,
}: {
  src: string;
  alt: string;
  className: string;
  style?: CSSProperties;
  /** Called once the image has loaded or failed (also for images already in the cache). */
  onSettled?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useCallback(
    (el: HTMLImageElement | null) => {
      if (el && el.complete && el.naturalWidth > 0) onSettled?.();
    },
    [onSettled],
  );
  if (failed)
    return (
      <div className={`${className} img-fallback`} style={style} role="img" aria-label={alt} data-error-code="ERR_ASSET_LOAD">
        <span>Image unavailable: {alt}</span>
        <span className="visually-hidden" role="alert">
          {ERROR_TEXT.ERR_ASSET_LOAD.title}.
        </span>
      </div>
    );
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={style}
      onLoad={() => onSettled?.()}
      onError={() => {
        setFailed(true);
        onSettled?.();
      }}
      draggable={false}
    />
  );
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
        <div key={location} className="stage__world" style={{ ...cropVars(c.crop, 'd'), ...cropVars(c.cropPhone, 'p') } as unknown as CSSProperties}>
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
  return (
    <figure
      className="stage"
      data-testid="stage"
      data-stage={princess ? (c.waterborne ? 'waterborne' : 'standard') : 'empty'}
      data-route={princess?.route ?? ''}
      data-location={location}
    >
      {/* Keyed by location: a fresh picture element per place, so the browser never
          keeps showing the previous location's background under the new staging. */}
      <World key={location} location={location} princess={princess} c={c} />
      <figcaption className="stage__label">
        {label}
        {princess && <span className="visually-hidden">, {ROUTE_NAME[princess.route]} is here</span>}
        {caption && <span className="stage__caption"> · {caption}</span>}
      </figcaption>
    </figure>
  );
}

function World({
  location,
  princess,
  c,
}: {
  location: LocationId;
  princess: StageProps['princess'];
  c: Composition;
}) {
  // The princess (and Nerelle's water foreground) appear only once this
  // location's background is on screen, so she is never seen over a blank or
  // stale picture while it loads.
  const [bgReady, setBgReady] = useState(false);
  const settled = useCallback(() => setBgReady(true), []);
  const vars = { ...cropVars(c.crop, 'd'), ...cropVars(c.cropPhone, 'p') } as unknown as CSSProperties;
  const hidden: CSSProperties = bgReady ? {} : { visibility: 'hidden' };
  return (
    <div className="stage__world" style={vars} data-ready={bgReady ? 'true' : 'false'}>
      <Img src={art.background(location)} alt={LOCATION_ALT[location]} className="stage__bg" onSettled={settled} />
      {princess && (
        <Img
          src={art.sprite(princess.route, princess.expression)}
          alt={`${spriteAlt(princess.route, princess.expression)}${c.waterborne ? ` She is in the water${location === 'royal_gardens' ? ' of the canal' : ''}.` : ''}`}
          className="stage__sprite"
          style={{ ...(spriteStyle(c.sprite) as unknown as CSSProperties), ...hidden }}
        />
      )}
      {princess && c.occluder && (
        // Foreground made only of the approved background's own pixels.
        <img
          src={art.background(location)}
          alt=""
          aria-hidden="true"
          className="stage__occluder"
          style={{ clipPath: polygonClip(c.occluder), ...hidden }}
          draggable={false}
          data-testid="occluder"
        />
      )}
    </div>
  );
}
