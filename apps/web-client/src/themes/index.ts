import type { ThemeRegistry } from "@repo/theme";

import { DarkTheme } from "./Dark";
import { LightTheme } from "./Light";

export const themeRegistry: ThemeRegistry = {
  dark: DarkTheme,
  light: LightTheme,
};
