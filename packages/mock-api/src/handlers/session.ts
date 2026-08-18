import { ApiError } from "@repo/api";

import { RouteDef } from "../types";
import { DEMO_CREDENTIALS, DEMO_OTP_CODE, DEMO_SESSION } from "../fixtures/session";
import { login, logout, mockState } from "../state";

const sessionPayload = () => ({
  token: DEMO_SESSION.token,
  tokenType: DEMO_SESSION.tokenType,
  accountId: DEMO_SESSION.accountId,
  username: DEMO_SESSION.username,
  expiresIn: DEMO_SESSION.expiresIn,
});

export const sessionRoutes: RouteDef[] = [
  {
    method: "post",
    pattern: "demo/session",
    handler: (req) => {
      const payload = (req.data ?? {}) as { username?: string; password?: string };

      if (payload.username !== DEMO_CREDENTIALS.username || payload.password !== DEMO_CREDENTIALS.password) {
        throw new ApiError(422, { message: "Invalid demo credentials" }, "Invalid demo credentials");
      }

      // Credentials alone don't establish a session — a second factor is
      // required before `login()` is called (see "demo/session/otp" below).
      return { data: { mfaRequired: true } };
    },
  },
  {
    method: "post",
    pattern: "demo/session/otp",
    handler: (req) => {
      const payload = (req.data ?? {}) as { code?: string };

      if (payload.code !== DEMO_OTP_CODE) {
        throw new ApiError(422, { message: "Invalid verification code" }, "Invalid verification code");
      }

      login();
      return { data: sessionPayload() };
    },
  },
  {
    method: "get",
    pattern: "demo/session",
    handler: () => {
      if (!mockState.isAuthenticated) {
        throw new ApiError(401, { message: "Not authenticated" });
      }
      return { data: sessionPayload() };
    },
  },
  {
    method: "post",
    pattern: "demo/session/refresh",
    handler: () => ({ data: sessionPayload() }),
  },
  {
    method: "delete",
    pattern: "demo/session",
    handler: () => {
      logout();
      return { data: { success: true } };
    },
  },
];
