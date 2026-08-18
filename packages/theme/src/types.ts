export type ThemeMode = "dark" | "light";

export type ThemeTokens = Record<string, string>;

export interface ThemeDefinition {
  tokens: ThemeTokens;
}

export type ThemeRegistry = Record<ThemeMode, ThemeDefinition>;
