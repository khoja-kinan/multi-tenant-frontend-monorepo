import { FC, ReactNode } from "react";
import { Spinner } from "@repo/ui";

import { useSessionStore } from "./state/useSessionStore";

import s from "./ProtectedRoute.module.scss";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback: ReactNode;
}

/** Renders `children` once authenticated, `fallback` otherwise — the same gate a real protected route would use. */
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const status = useSessionStore((store) => store.status);

  if (status === "checking") {
    return (
      <div className={s.checking} role="status" aria-live="polite">
        <Spinner />
        <span>Checking session…</span>
      </div>
    );
  }

  return status === "authenticated" ? <>{children}</> : <>{fallback}</>;
};
