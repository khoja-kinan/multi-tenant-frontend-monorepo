import { ThemeDefinition, buildFeatureTokens } from "@repo/theme";

export const LightTheme: ThemeDefinition = {
  tokens: {
    app_bg: "#F7F8F9",
    app_header_bg: "rgba(247, 248, 249, 0.85)",
    app_hero_bg: "linear-gradient(180deg, #FFFFFF 0%, #F1F3F4 100%)",
    app_section_alt_bg: "#FFFFFF",
    app_text: "#14181B",
    app_text_muted: "#5B6368",
    app_accent: "#059669",
    app_accent_soft: "rgba(5, 150, 105, 0.10)",
    app_accent_contrast: "#FFFFFF",
    surface_bg: "#FFFFFF",
    surface_raised_bg: "#F1F3F4",
    border_primary: "rgba(15, 23, 20, 0.08)",
    ...buildFeatureTokens({
      pageBg: "#F7F8F9",
      surface: "#FFFFFF",
      surfaceRaised: "#F1F3F4",
      text: "#14181B",
      textMuted: "#5B6368",
      primary: "#059669",
      primarySoft: "rgba(5, 150, 105, 0.10)",
      primaryContrast: "#FFFFFF",
      border: "rgba(15, 23, 20, 0.08)",
      danger: "#DC2626",
      success: "#16A34A",
    }),
  },
};
