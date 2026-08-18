import { RouteDef } from "../types";
import { DEMO_PREFERENCES, genericVerificationCode } from "../fixtures/profile";
import { mockState } from "../state";

export const profileRoutes: RouteDef[] = [
  {
    method: "get",
    pattern: "demo/profile",
    handler: () => ({ data: mockState.profile }),
  },
  {
    method: "patch",
    pattern: "demo/profile",
    handler: (req) => {
      Object.assign(mockState.profile, req.data as object);
      return { data: mockState.profile };
    },
  },
  {
    method: "post",
    pattern: "demo/profile/verification",
    handler: () => ({ data: genericVerificationCode() }),
  },
  {
    method: "get",
    pattern: "demo/preferences",
    handler: () => ({ data: DEMO_PREFERENCES }),
  },
  {
    method: "patch",
    pattern: "demo/preferences",
    handler: (req) => ({ data: { ...DEMO_PREFERENCES, ...(req.data as object) } }),
  },
];
