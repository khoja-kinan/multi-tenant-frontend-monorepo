import React from "react";
import ReactDOM from "react-dom/client";
import { installMockApi } from "@repo/mock-api";
import App from "./App";

// Portfolio demo mode: all API calls are served from local mock data.
// Set VITE_ENABLE_API_MOCKS=false only if you have wired up a real backend.
if (import.meta.env.VITE_ENABLE_API_MOCKS !== "false") {
  installMockApi("Nova");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // StrictMode intentionally double-invokes effects in dev to surface
  // side-effect bugs early (React 18 behavior, not a bug in this app).
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
