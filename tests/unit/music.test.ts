// Background music (owner request 2026-10-25): which screen plays what, finding
// the exact music inside a decoded MP3, and the shipped files' integrity.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { musicCueFor } from '../../src/audio/cue.ts';
import { DECLICK, decodeFingerprint, findLead, monoPrefix, trimToMusic } from '../../src/audio/align.ts';
import { TRACKS } from '../../src/audio/tracks.generated.ts';

const PRO = 'CORE-PRO-01';

describe('Music: which screen plays what', () => {
  test('title music on the title screen and the menus reached from it, including character selection', () => {
    for (const k of ['title', 'newRun', 'gallery', 'credits']) assert.equal(musicCueFor({ k }, 'ready', PRO), 'title', k);
    assert.equal(musicCueFor({ k: 'tutorial', then: { k: 'title' } }, 'ready', PRO), 'title', '"How to play" from the title screen');
  });
  test('"Enter the Town" during the prologue, also when replayed from the gallery', () => {
    assert.equal(musicCueFor({ k: 'present', sceneId: PRO }, 'ready', PRO), 'prologue');
  });
  test('silence in the game itself, in other scenes, and before storage is ready', () => {
    for (const k of ['hub', 'encounter', 'ended']) assert.equal(musicCueFor({ k }, 'ready', PRO), null, k);
    for (const sceneId of ['CORE-FAIL-01', 'TAV-EPI-01']) assert.equal(musicCueFor({ k: 'present', sceneId }, 'ready', PRO), null, sceneId);
    assert.equal(musicCueFor({ k: 'tutorial', then: { k: 'hub' } }, 'ready', PRO), null, 'first-run tutorial after the prologue');
    for (const phase of ['booting', 'recovery', 'unavailable']) assert.equal(musicCueFor({ k: 'title' }, phase, PRO), null, phase);
  });
});

/** Deterministic noise-like test signal. */
function signal(n: number, seed = 1): Float32Array {
  const out = new Float32Array(n);
  let x = seed;
  for (let i = 0; i < n; i++) {
    x = (x * 1103515245 + 12345) % 2147483648;
    out[i] = (x / 2147483648 - 0.5) * 0.6 + 0.3 * Math.sin(i / 7);
  }
  return out;
}

describe('Music: finding the exact music in a decoded file', () => {
  test('the fingerprint is found wherever a decoder put the music (0, 528 or 1057 samples in)', () => {
    const music = signal(20000);
    const fp = music.slice(0, 2048);
    for (const lead of [0, 528, 1057]) {
      const decoded = new Float32Array(lead + music.length + 1247);
      decoded.set(music, lead);
      const found = findLead(decoded, fp, decoded.length - music.length);
      assert.equal(found.lead, lead);
      assert.ok(found.score > 0.9999);
    }
  });
  test('fingerprints decode from 16-bit little-endian base64', () => {
    const b64 = Buffer.from(Int16Array.from([0, 16384, -16384, 32767, -32768]).buffer).toString('base64');
    assert.deepEqual(Array.from(decodeFingerprint(b64)), [0, 0.5, -0.5, 32767 / 32768, -1]);
  });
  test('trimming keeps exactly the music; a looping track joins its own start without a step', () => {
    const music = signal(10000, 7);
    const decoded = new Float32Array(1057 + music.length + 900);
    decoded.set(music, 1057);
    const [once] = trimToMusic([decoded], 1057, music.length, false);
    assert.deepEqual(Array.from(once!), Array.from(music));
    const [looped] = trimToMusic([decoded], 1057, music.length, true);
    assert.equal(looped!.length, music.length);
    assert.deepEqual(Array.from(looped!.subarray(0, music.length - DECLICK)), Array.from(music.subarray(0, music.length - DECLICK)));
    const seam = Math.abs(looped![0]! - looped![music.length - 1]!);
    assert.ok(seam <= Math.abs(music[0]! - music[music.length - 1]!) / (DECLICK + 1) + 1e-6, `seam step ${seam}`);
  });
  test('mono prefix averages the channels', () => {
    assert.deepEqual(Array.from(monoPrefix([Float32Array.from([1, 0.5]), Float32Array.from([0, 0.5])], 2)), [0.5, 0.5]);
  });
});

describe('Music: shipped files', () => {
  test('each track is the owner’s file byte for byte, named by its hash, with a usable fingerprint', () => {
    const files = readdirSync('public/audio').filter((f) => f.endsWith('.mp3'));
    assert.equal(files.length, Object.keys(TRACKS).length, 'no stray audio files');
    for (const [id, t] of Object.entries(TRACKS)) {
      const bytes = readFileSync(`public${t.file}`);
      const sha = createHash('sha256').update(bytes).digest('hex');
      assert.equal(sha, t.sha256, id);
      assert.equal(bytes.length, t.bytes, id);
      assert.ok(t.file.includes(`.${sha.slice(0, 8)}.mp3`), `${id}: file name carries its hash (safe to cache forever)`);
      const fp = decodeFingerprint(t.fingerprint);
      assert.equal(fp.length, 2048, id);
      const rms = Math.sqrt(fp.reduce((a, v) => a + v * v, 0) / fp.length);
      assert.ok(rms > 0.01, `${id}: fingerprint is music, not silence`);
      assert.ok(t.samples > t.sampleRate, id);
    }
    assert.equal(TRACKS.titleOpening.loop, false, 'the opening plays once');
    assert.equal(TRACKS.titleLoop.loop, true);
    assert.equal(TRACKS.town.loop, true);
  });
});
