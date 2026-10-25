// Shared browser-test support: a tiny static server on localhost (a secure
// context, so IndexedDB, Web Locks and crypto.subtle all work), bundling of
// the harness/app, and Playwright launch helpers.
import http from 'node:http';
import { createReadStream, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';
import { chromium } from 'playwright';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const ARTIFACTS = join(ROOT, '.test-artifacts');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

/** Serve `dir` on an ephemeral localhost port. Unknown paths fall back to index.html (SPA). */
export function serve(dir, { onRequest } = {}) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    onRequest?.(url.pathname);
    let p = normalize(join(dir, decodeURIComponent(url.pathname)));
    if (!p.startsWith(dir)) {
      res.writeHead(403).end();
      return;
    }
    if (!existsSync(p) || statSync(p).isDirectory()) p = join(dir, 'index.html');
    res.writeHead(200, { 'content-type': TYPES[extname(p)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
    createReadStream(p).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ url: `http://localhost:${port}`, close: () => new Promise((r) => server.close(r)) });
    });
  });
}

export async function buildHarness() {
  const out = join(ARTIFACTS, 'harness');
  mkdirSync(out, { recursive: true });
  await esbuild.build({
    entryPoints: [join(ROOT, 'tests/browser/harness.ts')],
    bundle: true,
    format: 'esm',
    target: 'es2022',
    outfile: join(out, 'harness.js'),
    logLevel: 'error',
  });
  writeFileSync(join(out, 'index.html'), '<!doctype html><html><head><meta charset="utf-8"><title>harness</title></head><body><script type="module" src="/harness.js"></script></body></html>');
  return out;
}

export async function launch() {
  return chromium.launch();
}

export async function openHarness(context, url) {
  const page = await context.newPage();
  page.on('pageerror', (e) => console.error('[pageerror]', e.message));
  await page.goto(url);
  await page.waitForFunction(() => document.body.dataset.ready === '1');
  return page;
}
