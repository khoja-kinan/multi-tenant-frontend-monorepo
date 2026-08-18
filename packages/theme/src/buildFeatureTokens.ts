import type { ThemeTokens } from "./types";

/**
 * Compact semantic token contract for feature packages that theme off CSS
 * custom properties instead of importing color values directly. A consuming
 * app supplies one palette and every component wired to it stays in sync
 * through these ~20 semantic names.
 */
export interface FeatureTokenPalette {
  pageBg: string;
  surface: string;
  surfaceRaised: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primarySoft: string;
  primaryContrast: string;
  danger: string;
  success: string;
}

export const buildFeatureTokens = (palette: FeatureTokenPalette): ThemeTokens => ({
  "color-page-bg": palette.pageBg,
  "color-surface": palette.surface,
  "color-surface-raised": palette.surfaceRaised,
  "color-text": palette.text,
  "color-text-muted": palette.textMuted,
  "color-border": palette.border,
  "color-primary": palette.primary,
  "color-primary-soft": palette.primarySoft,
  "color-primary-contrast": palette.primaryContrast,
  "color-danger": palette.danger,
  "color-success": palette.success,
  "color-overlay": "rgba(0, 0, 0, 0.6)",
  "color-disabled-overlay": "rgba(0, 0, 0, 0.5)",

  "control-height": "48px",
  "control-radius": "12px",
  "input-radius": "8px",
  "modal-radius": "16px",

  "shadow-sm": "0 1px 2px rgba(15, 23, 42, 0.06)",
  "shadow-md": "0 4px 12px -2px rgba(15, 23, 42, 0.12)",
  "shadow-lg": "0 12px 32px -8px rgba(15, 23, 42, 0.22)",
});
