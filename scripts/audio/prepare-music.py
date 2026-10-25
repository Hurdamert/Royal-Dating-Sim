"""Music tracks supplied by the project owner (2026-10-25) → game assets.

  python3 scripts/audio/prepare-music.py --import OPENING.mp3 LOOP.mp3 TOWN.mp3
      copy the owner's files byte for byte to public/audio/<slug>.<hash8>.mp3,
      then regenerate src/audio/tracks.generated.ts
  python3 scripts/audio/prepare-music.py
      regenerate src/audio/tracks.generated.ts from the files in public/audio/

Why the generated table exists: MP3 files carry a little silence before and
after the music (encoder delay and padding). GarageBand records the exact
amounts in an iTunSMPB tag, but browsers honour it differently, so a decoded
track can start 0, 528 or 1057 samples late. A seamless loop needs the exact
first and last sample. For each track the table records the true sample count
and a "fingerprint" (the first 2048 samples of the music, mono, 16-bit); the
game finds that fingerprint in whatever the browser decoded and trims to it
(src/audio/align.ts). Needs ffmpeg/ffprobe.
"""
import base64, hashlib, json, os, re, shutil, subprocess, sys
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT_DIR = os.path.join(ROOT, 'public/audio')
GEN = os.path.join(ROOT, 'src/audio/tracks.generated.ts')
FP = 2048
MP3_DECODER_DELAY = 529  # samples ffmpeg's MP3 decoder adds when no LAME tag says otherwise

# Order matches the --import arguments.
TRACKS = [
    {'id': 'titleOpening', 'slug': 'title-opening', 'title': 'Start screen (opening)', 'loop': False},
    {'id': 'titleLoop', 'slug': 'title-loop', 'title': 'Start screen (loop)', 'loop': True},
    {'id': 'town', 'slug': 'enter-the-town', 'title': 'Enter the Town', 'loop': True},
]


def sha(path):
    with open(path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()


def smpb(path):
    """(delay, padding, samples) from GarageBand/iTunes gapless data, or None."""
    tags = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format_tags=iTunSMPB', '-of', 'default=nw=1:nk=1', path],
                          capture_output=True, text=True, check=True).stdout.split()
    if len(tags) < 4:
        return None
    return int(tags[1], 16), int(tags[2], 16), int(tags[3], 16)


def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 's16le', '-acodec', 'pcm_s16le', '-ac', '2', '-ar', '44100', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).reshape(-1, 2)


def describe(t, path):
    rate = int(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=sample_rate', '-of', 'default=nw=1:nk=1', path],
                              capture_output=True, text=True, check=True).stdout.strip())
    if rate != 44100:
        sys.exit(f'{path}: expected 44.1 kHz audio, got {rate}')
    pcm = decode(path)
    gap = smpb(path)
    if gap:
        delay, padding, samples = gap
        lead = delay + MP3_DECODER_DELAY
        if delay + padding + samples != len(pcm):
            sys.exit(f'{path}: gapless data does not match the decoded length')
    else:
        lead, samples = 0, len(pcm)
    mono = pcm.astype(np.int32).sum(1) // 2
    fp = mono[lead:lead + FP].astype('<i2').tobytes()
    return {
        'file': '/audio/' + os.path.basename(path),
        'sha256': sha(path),
        'bytes': os.path.getsize(path),
        'title': t['title'],
        'loop': t['loop'],
        'sampleRate': rate,
        'samples': samples,
        'fingerprint': base64.b64encode(fp).decode(),
    }


def main():
    args = sys.argv[1:]
    if args and args[0] == '--import':
        srcs = args[1:]
        if len(srcs) != len(TRACKS):
            sys.exit(f'--import needs {len(TRACKS)} files: ' + ', '.join(t['title'] for t in TRACKS))
        os.makedirs(OUT_DIR, exist_ok=True)
        for old in os.listdir(OUT_DIR):
            if old.endswith('.mp3'):
                os.remove(os.path.join(OUT_DIR, old))
        for t, src in zip(TRACKS, srcs):
            dst = os.path.join(OUT_DIR, f"{t['slug']}.{sha(src)[:8]}.mp3")
            shutil.copyfile(src, dst)
            t['source'] = re.sub(r'^[0-9a-f]{8}-', '', os.path.basename(src))  # drop the upload prefix
    files = sorted(os.listdir(OUT_DIR)) if os.path.isdir(OUT_DIR) else []
    table = {}
    for t in TRACKS:
        match = [f for f in files if re.fullmatch(re.escape(t['slug']) + r'\.[0-9a-f]{8}\.mp3', f)]
        if len(match) != 1:
            sys.exit(f"expected exactly one public/audio/{t['slug']}.<hash>.mp3, found {match}")
        path = os.path.join(OUT_DIR, match[0])
        if sha(path)[:8] != match[0].split('.')[-2]:
            sys.exit(f'{path}: file name hash does not match its contents')
        table[t['id']] = describe(t, path)
        if 'source' in t:
            table[t['id']]['source'] = t['source']
    # Keep the owner's original file names recorded on a plain regenerate.
    if os.path.exists(GEN) and not (args and args[0] == '--import'):
        old = json.loads(re.search(r'= (\{.*\}) as const', open(GEN).read(), re.S).group(1))
        for k, v in table.items():
            if 'source' in old.get(k, {}):
                v['source'] = old[k]['source']
    body = json.dumps(table, indent=2, ensure_ascii=False)
    with open(GEN, 'w') as f:
        f.write('// Generated by scripts/audio/prepare-music.py from public/audio/*.mp3. Do not edit.\n')
        f.write('// Music supplied by the project owner (2026-10-25). `samples` and `fingerprint`\n')
        f.write('// locate the exact music inside whatever a browser decodes (see src/audio/align.ts).\n')
        f.write(f'export const TRACKS = {body} as const;\n\nexport type TrackId = keyof typeof TRACKS;\n')
    for k, v in table.items():
        print(f"{k:13s} {v['file']}  {v['samples']} samples ({v['samples'] / v['sampleRate']:.3f} s)  {v['bytes'] // 1024} KiB")


if __name__ == '__main__':
    main()
