import { setMockDispatcher } from "@repo/api";
import { createDispatcher } from "./dispatcher";
import { allRoutes } from "./handlers";
import { resetMockState } from "./state";
import { setMockTenant, type MockTenant } from "./tenant";

export { DEMO_CREDENTIALS, DEMO_OTP_CODE } from "./fixtures/session";
export { resetMockState } from "./state";
export type { MockTenant } from "./tenant";

let installed = false;

/**
 * Installs the mock API layer by registering a dispatcher with @repo/api.
 * Must be called once before the app renders. Safe to call multiple times
 * (subsequent calls are no-ops).
 *
 * `tenant` selects which app's demo fixtures (balance, activity, profile)
 * get seeded — every route, response shape, and handler is shared; only the
 * fixture values returned differ.
 */
export const installMockApi = (tenant: MockTenant = "Nova"): void => {
  if (installed) return;

  try {
    setMockTenant(tenant);
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
