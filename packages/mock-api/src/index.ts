import { setMockDispatcher } from "@repo/api";
import { createDispatcher } from "./dispatcher";
import { allRoutes } from "./handlers";
import { resetMockState } from "./state";

export { DEMO_CREDENTIALS, DEMO_OTP_CODE } from "./fixtures/session";
export { resetMockState } from "./state";

let installed = false;

/**
 * Installs the mock API layer by registering a dispatcher with @repo/api.
 * Must be called once before the app renders. Safe to call multiple times
 * (subsequent calls are no-ops).
 */
export const installMockApi = (): void => {
  if (installed) return;

  try {
    resetMockState();
    setMockDispatcher(createDispatcher(allRoutes));
    installed = true;
    console.info("[mock-api] Portfolio demo mode: all API calls are served locally from mock data.");
  } catch (err) {
    // Fail safely and visibly: never silently fall through to a real
    // network call if mock initialization breaks.
    console.error(
      "[mock-api] Failed to initialize mock API layer. The app will not be able to make API calls.",
      err,
    );
  }
};

export const isMockApiInstalled = (): boolean => installed;
