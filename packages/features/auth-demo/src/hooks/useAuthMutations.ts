import { useMutationApi, useQueryApi } from "@repo/query";

import { useSessionStore, DemoSession } from "../state/useSessionStore";

type SessionResponse = DemoSession;

/** Step 1 of the demo login flow: validates credentials, does not establish a session. */
export const useLoginStep = () =>
  useMutationApi<{ username: string; password: string }, { mfaRequired: boolean }>({
    url: "demo/session",
    method: "post",
  });

/** Step 2: verifies the one-time code and, on success, establishes the session. */
export const useVerifyOtpStep = () => {
  const setSession = useSessionStore((store) => store.setSession);

  return useMutationApi<{ code: string }, SessionResponse>({
    url: "demo/session/otp",
    method: "post",
    options: {
      onSuccess: (session) => setSession(session),
    },
  });
};

export const useLogoutMutation = () => {
  const clearSession = useSessionStore((store) => store.clearSession);

  return useMutationApi<Record<string, never>, { success: boolean }>({
    url: "demo/session",
    method: "delete",
    options: {
      onSuccess: () => clearSession(),
      onError: () => clearSession(),
    },
  });
};

export const useRefreshSessionMutation = () => {
  const setSession = useSessionStore((store) => store.setSession);

  return useMutationApi<Record<string, never>, SessionResponse>({
    url: "demo/session/refresh",
    method: "post",
    options: {
      onSuccess: (session) => setSession(session),
    },
  });
};

/** One-shot session hydration check, run once by AuthProvider on mount. */
export const useSessionHydration = () =>
  useQueryApi<SessionResponse>({
    url: "demo/session",
    key: ["demo-session"],
    options: {
      retry: false,
      refetchOnMount: false,
    },
  });
