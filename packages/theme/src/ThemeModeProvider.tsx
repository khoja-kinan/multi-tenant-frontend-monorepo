import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { ThemeMode, ThemeRegistry } from "./types";

const STORAGE_KEY = "theme-mode";

interface ThemeModeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

/** Reads the active mode and setter from the nearest `<ThemeModeProvider>`. */
export const useThemeMode = (): ThemeModeContextValue => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used inside <ThemeModeProvider>");
  return ctx;
};

const readStoredMode = (fallback: ThemeMode): ThemeMode => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "dark" || stored === "light" ? stored : fallback;
};

const applyTokensToRoot = (tokens: Record<string, string>): void => {
  for (const [name, value] of Object.entries(tokens)) {
    document.documentElement.style.setProperty(`--${name}`, value);
  }
};

/**
 * Owns which mode ("dark" | "light") is active for the tree below it,
 * resolves that mode against `registry` to find the token set, and keeps
 * the choice in sync with localStorage. Reading the stored mode inside the
 * `useState` initializer means the very first render already has the right
 * mode — a single `useEffect` then does the one side effect this needs:
 * writing the resolved tokens onto `:root` and persisting the mode whenever
 * it changes (including once, for the initial mode).
 */
export const ThemeModeProvider = ({
  registry,
  initialMode = "dark",
  children,
}: {
  registry: ThemeRegistry;
  initialMode?: ThemeMode;
  children: ReactNode;
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => readStoredMode(initialMode));

  useEffect(() => {
    applyTokensToRoot(registry[mode].tokens);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, registry]);

  return <ThemeModeContext.Provider value={{ mode, setMode }}>{children}</ThemeModeContext.Provider>;
};
