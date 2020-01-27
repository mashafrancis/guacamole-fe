import * as React from 'react';

// components
import InternalServerErrorMessage from '@components/InternalServerErrorMessage';

// interfaces
import { ErrorBoundaryState } from '@components/ErrorBoundary/interfaces';

export class ErrorBoundary extends React.Component<ErrorBoundaryState> {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  state = {
    eventId: null,
    hasError: false,
  };

  render() {
    if (this.state.hasError) {
      // render fallback UI
      return (
        <InternalServerErrorMessage />
      );
    }

    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
