import React from "react";

import { ThemeModeProvider } from "@repo/theme";
import { themeRegistry } from "themes";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeModeProvider registry={themeRegistry} initialMode="dark">
    {children}
  </ThemeModeProvider>
);

export default ThemeProvider;
