// Which music belongs to which screen (owner request, 2026-10-25): the title
// music on the title screen and everything reached from it (character selection,
// gallery, credits, "How it works"), "Enter the Town" during the prologue, and
// silence everywhere else.
import type { MusicCue } from './music';

export interface ScreenLike {
  k: string;
  sceneId?: string;
  then?: ScreenLike;
}

export function musicCueFor(screen: ScreenLike, phase: string, prologueSceneId: string): MusicCue | null {
  if (phase !== 'ready') return null;
  switch (screen.k) {
    case 'title':
    case 'newRun':
    case 'gallery':
    case 'credits':
      return 'title';
    case 'tutorial':
      // "How to play" opened from the title screen; the first-run tutorial after
      // the prologue and the one in Help are part of the game, which is quiet.
      return screen.then?.k === 'title' ? 'title' : null;
    case 'present':
      return screen.sceneId === prologueSceneId ? 'prologue' : null;
    default:
      return null;
  }
}
