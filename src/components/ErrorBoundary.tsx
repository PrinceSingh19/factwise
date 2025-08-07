import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
	errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log error to console or error reporting service
		console.error("Error caught by boundary:", error, errorInfo);
		this.setState({ error, errorInfo });
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen bg-gray-50 flex items-center justify-center">
					<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
						<div className="flex items-center mb-4">
							<AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
							<h1 className="text-xl font-semibold text-gray-900">Something went wrong</h1>
						</div>

						<p className="text-gray-600 mb-4">
							We're sorry, but something unexpected happened. Please try refreshing the page.
						</p>

						<div className="flex space-x-3">
							<button
								onClick={() => window.location.reload()}
								className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							>
								Refresh Page
							</button>

							<button
								onClick={() => this.setState({ hasError: false })}
								className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
							>
								Try Again
							</button>
						</div>

						{/* Development error details */}
						{import.meta.env.DEV && this.state.error && (
							<details className="mt-4 p-3 bg-gray-100 rounded-md">
								<summary className="cursor-pointer text-sm font-medium text-gray-700">
									Error Details (Development)
								</summary>
								<pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">
									{this.state.error.toString()}
									{this.state.errorInfo?.componentStack}
								</pre>
							</details>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
