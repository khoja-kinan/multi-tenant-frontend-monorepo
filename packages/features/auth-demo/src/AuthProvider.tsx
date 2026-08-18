import { FC, ReactNode, useEffect } from "react";

import { useSessionStore } from "./state/useSessionStore";
import { useSessionHydration } from "./hooks/useAuthMutations";

/**
 * Runs a one-time session check on mount (GET demo/session) so a page reload
 * can restore "authenticated" state the same way a real cookie/token check
 * would, then syncs the result into useSessionStore. Renders children
 * immediately — ProtectedRoute owns the "checking" loading UI.
 */
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setStatus, setSession } = useSessionStore((store) => ({
    setStatus: store.setStatus,
    setSession: store.setSession,
  }));
  const { data, isError, isFetched } = useSessionHydration();

  useEffect(() => {
    if (!isFetched) return;

    if (data) {
      setSession(data);
    } else if (isError) {
      setStatus("unauthenticated");
    }
  }, [isFetched, data, isError, setSession, setStatus]);

  return <>{children}</>;
};
