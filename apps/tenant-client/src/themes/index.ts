import type { ThemeRegistry } from "@repo/theme";

import { BaseTheme } from "./base-theme";

export const themeRegistry: ThemeRegistry = {
  dark: BaseTheme,
  light: BaseTheme, // single-palette tenant — both modes resolve the same for now
};
