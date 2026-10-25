// Fallback production build with esbuild (same entry, same static output shape
// as `vite build`). Used where Vite is not installable; output goes to
// dist-esbuild/ (or the directory given as the first argument).
import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, process.argv[2] ?? 'dist-esbuild');
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });

const result = await esbuild.build({
  entryPoints: [join(root, 'src/main.tsx')],
  bundle: true,
  format: 'esm',
  target: 'es2022',
  jsx: 'automatic',
  minify: true,
  sourcemap: true,
  metafile: true,
  outdir: join(out, 'assets'),
  entryNames: 'app-[hash]',
  assetNames: '[name]-[hash]',
  external: ['/fonts/*', '/art/*'],
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'linked',
  logLevel: 'warning',
});

cpSync(join(root, 'public'), out, { recursive: true });
const files = readdirSync(join(out, 'assets'));
const js = files.find((f) => /^app-.*\.js$/.test(f));
const css = files.find((f) => /^app-.*\.css$/.test(f));
let html = readFileSync(join(root, 'index.html'), 'utf8');
html = html.replace('<script type="module" src="/src/main.tsx"></script>', `<script type="module" src="/assets/${js}"></script>`);
html = html.replace('</head>', `    <link rel="stylesheet" href="/assets/${css}" />\n  </head>`);
writeFileSync(join(out, 'index.html'), html);

const bytes = Object.values(result.metafile.outputs).reduce((s, o) => s + o.bytes, 0);
console.log(`Built ${basename(out)}/: ${js}, ${css} (${(bytes / 1024).toFixed(0)} KiB of JS/CSS incl. source maps)`);
