import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    // Keep logging minimal per requirements
    console.error('App boundary caught an error:', error.message);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="error-boundary-fallback">
          <h2>Something went wrong</h2>
          <p>
            We encountered an unexpected issue. Please refresh the page and try
            again.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
