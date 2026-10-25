// Background music (owner request, 2026-10-25).
//
//   title     the start-screen opening once, then the start-screen loop, repeating
//             seamlessly; it carries on through character selection and the other
//             menus reached from the title screen
//   prologue  "Enter the Town", repeating (the track has its own ending)
//   null      silence (the town, conversations, endings)
//
// Web Audio is used, not <audio>, because only it can start the loop on the exact
// sample the opening ends and repeat it without a gap. Browsers keep sound off
// until the player first clicks or presses a key on the page; until then the
// music waits (status "waiting"), and it starts from the beginning of the cue on
// that first interaction. Music can be switched off; the choice is remembered in
// this browser. Nothing here can break the game: any failure just means silence.
import { decodeFingerprint, findLead, monoPrefix, trimToMusic, type Lead } from './align';
import { TRACKS, type TrackId } from './tracks.generated';

export type MusicCue = 'title' | 'prologue';
export type MusicStatus = 'off' | 'idle' | 'loading' | 'waiting' | 'playing' | 'unavailable';

export interface MusicState {
  enabled: boolean;
  cue: MusicCue | null;
  status: MusicStatus;
  /** Tracks scheduled for the current cue, in play order. */
  tracks: TrackId[];
  /** Increases each time a cue starts from its beginning (lets tests see restarts). */
  starts: number;
  /** Where each decoded track's music was found (diagnostics). */
  leads: Partial<Record<TrackId, Lead>>;
}

const CUE_TRACKS: Record<MusicCue, TrackId[]> = { title: ['titleOpening', 'titleLoop'], prologue: ['town'] };
const PREF_KEY = 'royal-exceptions:music';
const VOLUME = 0.55;
const FADE_OUT = 0.8;
const FADE_IN = 0.04;
const MAX_LEAD = 4096;

function readEnabled(): boolean {
  try {
    return localStorage.getItem(PREF_KEY) !== 'off';
  } catch {
    return true;
  }
}

type Playing = { gain: GainNode; sources: AudioBufferSourceNode[] };

export class MusicPlayer {
  private state: MusicState = { enabled: readEnabled(), cue: null, status: 'idle', tracks: [], starts: 0, leads: {} };
  private listeners = new Set<() => void>();
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private buffers = new Map<TrackId, Promise<AudioBuffer | null>>();
  private playing: Playing | null = null;
  private generation = 0;
  private unlockInstalled = false;

  constructor() {
    if (!this.state.enabled) this.state = { ...this.state, status: 'off' };
  }

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };
  getState = () => this.state;

  private set(patch: Partial<MusicState>) {
    this.state = { ...this.state, ...patch };
    for (const fn of this.listeners) fn();
  }

  /** Called by the app whenever the screen changes. Same cue = keep playing. */
  setCue(cue: MusicCue | null) {
    if (cue === this.state.cue) return;
    this.set({ cue });
    this.restart();
  }

  setEnabled(enabled: boolean) {
    if (enabled === this.state.enabled) return;
    try {
      localStorage.setItem(PREF_KEY, enabled ? 'on' : 'off');
    } catch {
      /* the preference is optional */
    }
    this.set({ enabled });
    // Switching music on is itself a click, so the browser lets sound start now.
    if (enabled) void this.ctx?.resume().catch(() => undefined);
    this.restart();
  }

  private context(): AudioContext | null {
    if (this.ctx) return this.ctx;
    const Ctor = typeof window !== 'undefined' ? window.AudioContext : undefined;
    if (!Ctor) return null;
    try {
      this.ctx = new Ctor();
    } catch {
      return null;
    }
    this.master = this.ctx.createGain();
    this.master.gain.value = VOLUME;
    this.master.connect(this.ctx.destination);
    this.ctx.addEventListener('statechange', () => this.refreshStatus());
    // Only the visible tab plays (a second, read-only tab stays quiet).
    document.addEventListener('visibilitychange', () => {
      if (!this.ctx) return;
      if (document.hidden) void this.ctx.suspend().catch(() => undefined);
      else if (this.playing) void this.ctx.resume().catch(() => undefined);
    });
    return this.ctx;
  }

  /** Browsers start audio suspended until the first click or key press on the page. */
  private installUnlock() {
    if (this.unlockInstalled) return;
    this.unlockInstalled = true;
    const unlock = () => {
      if (!this.ctx || this.ctx.state === 'running') return;
      void this.ctx.resume().catch(() => undefined);
    };
    for (const type of ['pointerdown', 'keydown', 'touchend'] as const) window.addEventListener(type, unlock, { capture: true });
  }

  private refreshStatus() {
    if (!this.playing || !this.ctx) return;
    this.set({ status: this.ctx.state === 'running' ? 'playing' : 'waiting' });
  }

  private load(id: TrackId): Promise<AudioBuffer | null> {
    let p = this.buffers.get(id);
    if (!p) {
      p = this.decode(id).catch(() => null);
      this.buffers.set(id, p);
    }
    return p;
  }

  private async decode(id: TrackId): Promise<AudioBuffer | null> {
    const t = TRACKS[id];
    const res = await fetch(t.file);
    if (!res.ok) return null;
    const data = await res.arrayBuffer();
    // Decode at the track's own rate so sample positions match the fingerprint;
    // playback in the real context resamples to the device rate if needed.
    const raw = await new OfflineAudioContext(2, 1, t.sampleRate).decodeAudioData(data);
    const channels = Array.from({ length: raw.numberOfChannels }, (_, c) => raw.getChannelData(c));
    const fp = decodeFingerprint(t.fingerprint);
    const maxLead = Math.min(MAX_LEAD, Math.max(0, raw.length - t.samples));
    const lead = findLead(monoPrefix(channels, maxLead + fp.length), fp, maxLead);
    this.set({ leads: { ...this.state.leads, [id]: lead } });
    const music = trimToMusic(channels, lead.lead, t.samples, t.loop);
    const out = new AudioBuffer({ length: music[0]!.length, numberOfChannels: music.length, sampleRate: t.sampleRate });
    music.forEach((ch, c) => out.copyToChannel(ch, c));
    return out;
  }

  private fadeOut() {
    const p = this.playing;
    this.playing = null;
    if (!p || !this.ctx) return;
    const now = this.ctx.currentTime;
    p.gain.gain.cancelScheduledValues(now);
    p.gain.gain.setValueAtTime(p.gain.gain.value, now);
    p.gain.gain.linearRampToValueAtTime(0, now + FADE_OUT);
    for (const s of p.sources) {
      try {
        s.stop(now + FADE_OUT + 0.05);
      } catch {
        /* never started */
      }
    }
    setTimeout(() => p.gain.disconnect(), (FADE_OUT + 0.3) * 1000);
  }

  /** Stop whatever plays and start the current cue from its beginning. */
  private restart() {
    const gen = ++this.generation;
    const { cue, enabled } = this.state;
    // A new cue begins as the previous one finishes fading out.
    const fadeEnd = this.playing && this.ctx ? this.ctx.currentTime + FADE_OUT * 0.75 : 0;
    this.fadeOut();
    if (!enabled || !cue) {
      // Decoded music is large (about 27 MB for the 76-second town track); free it
      // while nothing plays. The files stay in the HTTP cache for next time.
      this.buffers.clear();
      return this.set({ status: enabled ? 'idle' : 'off', tracks: [] });
    }
    const ctx = this.context();
    if (!ctx) return this.set({ status: 'unavailable', tracks: [] });
    this.installUnlock();
    void ctx.resume().catch(() => undefined); // allowed if the page already had a click
    const ids = CUE_TRACKS[cue];
    this.set({ status: 'loading', tracks: ids });
    void Promise.all(ids.map((id) => this.load(id))).then((buffers) => {
      if (gen !== this.generation || !this.master) return;
      const ready = ids.flatMap((id, i) => (buffers[i] ? [{ id, buffer: buffers[i]! }] : []));
      if (!ready.length) return this.set({ status: 'unavailable', tracks: [] });
      const gain = ctx.createGain();
      gain.connect(this.master);
      const t0 = Math.max(ctx.currentTime + 0.05, fadeEnd);
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(1, t0 + FADE_IN);
      let at = t0;
      const sources = ready.map(({ id, buffer }, i) => {
        const s = ctx.createBufferSource();
        s.buffer = buffer;
        // The last track of a cue repeats; earlier ones (the opening) play once.
        s.loop = i === ready.length - 1 && TRACKS[id].loop;
        s.connect(gain);
        s.start(at);
        at += buffer.duration;
        return s;
      });
      this.playing = { gain, sources };
      this.set({ tracks: ready.map((r) => r.id), starts: this.state.starts + 1 });
      this.refreshStatus();
    });
  }
}

export const music = new MusicPlayer();
