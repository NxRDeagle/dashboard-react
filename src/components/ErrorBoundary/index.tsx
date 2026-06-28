import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center p-6 rounded-2xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
            <div className="text-center">
              <p className="text-2xl mb-2">⚠️</p>
              <p className="font-semibold text-red-700 dark:text-red-400">
                Something went wrong
              </p>
              <p className="text-sm text-red-500 mt-1">
                {this.state.error?.message}
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
