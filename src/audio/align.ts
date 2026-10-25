// Locating the music inside a decoded MP3, sample-exactly (pure functions, no
// Web Audio, so they are unit-tested in Node).
//
// MP3 encoders add silence before and after the music, and browsers remove it
// differently: the same file decodes with the music starting 0, 528 or 1057
// samples in. scripts/audio/prepare-music.py records each track's true sample
// count and its first 2048 samples (the fingerprint); `findLead` finds where that
// fingerprint sits in what this browser decoded, and `trimToMusic` cuts exactly
// the music out, so the opening hands over to the loop and the loop repeats
// without a gap or a click.

/** Mono 16-bit little-endian samples (base64) → floats in [-1, 1). */
export function decodeFingerprint(b64: string): Float32Array {
  const bin = atob(b64);
  const out = new Float32Array(bin.length >> 1);
  for (let i = 0; i < out.length; i++) {
    const v = bin.charCodeAt(2 * i) | (bin.charCodeAt(2 * i + 1) << 8);
    out[i] = (v >= 0x8000 ? v - 0x10000 : v) / 32768;
  }
  return out;
}

/** Average of the channels over the first `length` samples. */
export function monoPrefix(channels: readonly Float32Array[], length: number): Float32Array {
  const n = Math.min(length, channels[0]?.length ?? 0);
  const out = new Float32Array(n);
  for (const ch of channels) for (let i = 0; i < n; i++) out[i]! += ch[i]! / channels.length;
  return out;
}

export interface Lead {
  /** Samples of encoder/decoder silence before the music in this decode. */
  lead: number;
  /** Normalised correlation at that offset (1 = identical). */
  score: number;
}

/** The offset in [0, maxLead] where `fp` best matches `mono` (normalised cross-correlation). */
export function findLead(mono: Float32Array, fp: Float32Array, maxLead: number): Lead {
  let fpEnergy = 0;
  for (let i = 0; i < fp.length; i++) fpEnergy += fp[i]! * fp[i]!;
  const last = Math.max(0, Math.min(maxLead, mono.length - fp.length));
  let best: Lead = { lead: 0, score: -1 };
  for (let lead = 0; lead <= last; lead++) {
    let dot = 0;
    let energy = 0;
    for (let i = 0; i < fp.length; i++) {
      const m = mono[lead + i]!;
      dot += m * fp[i]!;
      energy += m * m;
    }
    const denom = Math.sqrt(energy * fpEnergy);
    const score = denom > 0 ? dot / denom : 0;
    if (score > best.score) best = { lead, score };
  }
  return best;
}

/** Samples at the end of a looping track blended toward its first sample, so the
 * repeat joins without a step (about 0.7 ms at 44.1 kHz; inaudible otherwise). */
export const DECLICK = 32;

/**
 * Copy exactly `samples` samples starting at `lead` from each channel. For a
 * looping track the last DECLICK samples are eased toward the first sample, so the
 * waveform is continuous across the repeat.
 */
export function trimToMusic(channels: readonly Float32Array[], lead: number, samples: number, loop: boolean): Float32Array<ArrayBuffer>[] {
  return channels.map((ch) => {
    const n = Math.max(0, Math.min(samples, ch.length - lead));
    const out = new Float32Array(ch.subarray(lead, lead + n));
    if (loop && n > 2 * DECLICK) {
      const step = out[0]! - out[n - 1]!;
      for (let i = 0; i < DECLICK; i++) out[n - DECLICK + i]! += step * ((i + 1) / (DECLICK + 1));
    }
    return out;
  });
}
