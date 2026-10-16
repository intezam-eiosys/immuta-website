import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import CoursePage from "@/pages/CoursePage";
import AdminPage from "@/pages/AdminPage";

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
        <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
          <div>
            <p className="font-display text-2xl font-bold text-textmain">
              Something went wrong.
            </p>
            <p className="mt-3 text-sm text-text2">
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
        <Routes>
          <Route path="/" element={<CoursePage />} />
          <Route path="/light" element={<CoursePage key="light" theme="light" />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<CoursePage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
