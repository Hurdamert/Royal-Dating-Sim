import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ErrorBoundary } from './ui/components/ErrorBoundary';
import { GameSession } from './persistence/session';
import './fonts.generated.css';
import './styles.css';

const session = new GameSession();
// Read-only snapshot access for diagnostics and end-to-end tests. Nothing that
// can write to storage is exposed; the game never reads this.
(window as unknown as { __royalExceptions?: Pick<GameSession, 'getSnapshot'> }).__royalExceptions = { getSnapshot: session.getSnapshot };
void session.init();
window.addEventListener('pagehide', () => session.dispose());
// A page restored from the back-forward cache has a closed database and no
// writer lock; start fresh instead of running on disposed storage.
window.addEventListener('pageshow', (e) => {
  if (e.persisted) location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App session={session} />
    </ErrorBoundary>
  </StrictMode>,
);
