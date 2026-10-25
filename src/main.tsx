import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GameSession } from './persistence/session';
import './fonts.generated.css';
import './styles.css';

const session = new GameSession();
// Exposed for diagnostics and end-to-end tests only; the game never reads it.
(window as unknown as { __royalExceptions?: GameSession }).__royalExceptions = session;
void session.init();
window.addEventListener('pagehide', () => session.dispose());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App session={session} />
  </StrictMode>,
);
