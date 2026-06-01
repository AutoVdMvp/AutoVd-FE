"use client";

import { Component, ReactNode, ErrorInfo } from "react";
import { Button } from "./Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// React 에러 경계. 자식 컴포넌트의 런타임 에러를 포착해 대체 UI를 렌더한다.
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 px-4 text-center">
          <p className="text-rose-deep font-semibold">문제가 발생했습니다</p>
          <p className="text-text-muted text-sm max-w-xs">
            {this.state.error?.message ?? "알 수 없는 오류"}
          </p>
          <Button
            size="sm"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 bg-peach-pastel text-text-primary hover:bg-peach-deep hover:text-white"
          >
            다시 시도
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
