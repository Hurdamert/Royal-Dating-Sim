// Renders authored text as React text nodes only (never innerHTML): supports
// the authored inline emphasis markers *italic* and **bold**, and substitutes
// only the explicit {PLAYER} token with the (already length-limited) name.
import { Fragment, type ReactNode } from 'react';

export function substitutePlayer(text: string, playerName: string): string {
  return text.split('{PLAYER}').join(playerName);
}

export function RichText({ text, playerName }: { text: string; playerName: string }) {
  const s = substitutePlayer(text, playerName);
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(<Fragment key={k++}>{s.slice(last, m.index)}</Fragment>);
    if (m[1] !== undefined) out.push(<strong key={k++}>{m[1]}</strong>);
    else out.push(<em key={k++}>{m[2]}</em>);
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(<Fragment key={k++}>{s.slice(last)}</Fragment>);
  return <>{out}</>;
}

/** Plain-text version for screen-reader announcements and aria labels. */
export function plainText(text: string, playerName: string): string {
  return substitutePlayer(text, playerName).replace(/\*\*([^*]+)\*\*|\*([^*]+)\*/g, (_, a, b) => a ?? b);
}
