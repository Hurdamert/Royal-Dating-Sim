// Last-resort guard for rendering errors (e.g. a scene that cannot be resolved).
// Committed progress lives in IndexedDB and is untouched by a render failure, so
// the safe recovery is to say so and offer a reload.
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ERROR_TEXT } from '../../persistence/errors';

interface Props {
  children?: ReactNode;
}
interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[royal-exceptions] screen failed to render', error, info.componentStack);
  }

  override render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    const contentMissing = /scene|content/i.test(error.message);
    const text = contentMissing ? ERROR_TEXT.ERR_CONTENT_MISSING : { title: 'This screen could not be shown', body: 'Something went wrong while drawing this screen. Your last saved action is safe.' };
    return (
      <main className="panel" role="alert" data-testid="render-error" data-code={contentMissing ? 'ERR_CONTENT_MISSING' : 'render'}>
        <h1>{text.title}</h1>
        <p>{text.body}</p>
        <button type="button" className="btn btn--primary" onClick={() => location.reload()}>
          Reload the game
        </button>
      </main>
    );
  }
}
