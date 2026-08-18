import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

export type SessionStatus = "checking" | "authenticated" | "unauthenticated";

export interface DemoSession {
  token: string;
  username: string;
  expiresIn: number;
}

interface SessionState {
  status: SessionStatus;
  session: DemoSession | null;
  setStatus: (status: SessionStatus) => void;
  setSession: (session: DemoSession) => void;
  clearSession: () => void;
}

export const useSessionStore = createWithEqualityFn<SessionState>(
  (set) => ({
    status: "checking",
    session: null,
    setStatus: (status) => set({ status }),
    setSession: (session) => set({ session, status: "authenticated" }),
    clearSession: () => set({ session: null, status: "unauthenticated" }),
  }),
  shallow,
);
