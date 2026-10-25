# Deploying to Cloudflare Pages

The game is a static site: `npm run build` produces `dist/` (HTML, hashed JS/CSS, `art/`, `fonts/`, `licenses/`, `_headers`). There is no server code. Per the handoff, deploy **only after the project owner has approved** the build (screens, Nerelle staging, copy).

## One-time setup

1. Install dependencies and commit the lockfile (it could not be generated in the authoring environment):
   ```bash
   npm install
   git add package-lock.json && git commit -m "Add lockfile"
   ```
2. Fetch the fonts once locally to check them (`npm run fonts`). They are not committed; the build fetches them.

## Cloudflare Pages project (Git integration)

| Setting | Value |
|---|---|
| Framework preset | None (or Vite) |
| Build command | `npm ci && npm run fonts && npm run build` |
| Build output directory | `dist` |
| Node version | `NODE_VERSION=22` (environment variable) |

`public/_headers` ships a strict Content-Security-Policy (`default-src 'self'`; no third-party hosts), `nosniff`, `no-referrer`, and long-lived caching for hashed assets and art. Cloudflare Pages serves `index.html` for unknown paths (single-page app), and the game only uses `/`.

## Manual deploy (Wrangler)

```bash
npm run fonts && npm run build
npx wrangler pages deploy dist --project-name royal-exceptions
```

## Smoke test after deploying

1. Open the site in a normal window: title screen loads, no console errors.
2. Start a run, train once, reload: progress is still there (“Saved locally”).
3. Open a second tab: it shows the read-only banner.
4. Credits & licenses page: font license links open (only after `npm run fonts` ran in the build).
5. DevTools → Network: after load, no requests leave your domain.

## What the build checks before bundling

`npm run build` = source hashes → content table is current → derived art matches originals → strict type-check → `vite build`. Any mismatch stops the build.
