import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "@/App.css";
import CoursePage from "@/pages/CoursePage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B060F] px-6 text-center">
          <div>
            <p className="font-display text-2xl font-bold text-[#F4F1F8]">
              Something went wrong.
            </p>
            <p className="mt-3 text-sm text-[#B3A7C2]">
              Please refresh the page. If the issue persists, contact IMMUTA Technologies.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CoursePage />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
