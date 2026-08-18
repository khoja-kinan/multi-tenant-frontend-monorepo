import type { FC } from "react";
import cx from "classnames";

import LightThemeIcon from "./LightThemeIcon";
import DarkThemeIcon from "./DarkThemeIcon";

import { useThemeMode } from "../ThemeModeProvider";

import s from "./styles.module.scss";

export interface ThemeToggleProps {
  placement: "footer" | "sidebar";
}

/** Self-contained mode switch — reads and writes the active mode itself via `useThemeMode`. */
export const ThemeToggle: FC<ThemeToggleProps> = ({ placement }) => {
  const { mode, setMode } = useThemeMode();
  const placementClass = placement === "sidebar" ? s.sidebar : s.footer;

  return (
    <div className={cx(s.toggleWrapper, placementClass)}>
      <button
        className={cx(s.iconButton, placementClass, { [s.active]: mode === "light" })}
        onClick={() => setMode("light")}
      >
        <LightThemeIcon />
      </button>
      <button
        className={cx(s.iconButton, placementClass, { [s.active]: mode === "dark" })}
        onClick={() => setMode("dark")}
      >
        <DarkThemeIcon />
      </button>
    </div>
  );
};
