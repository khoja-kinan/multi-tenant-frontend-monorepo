import { ThemeDefinition, buildFeatureTokens } from "@repo/theme";

export const DarkTheme: ThemeDefinition = {
  tokens: {
    app_bg: "#0B0D0F",
    app_header_bg: "rgba(11, 13, 15, 0.85)",
    app_hero_bg: "linear-gradient(180deg, #101317 0%, #0B0D0F 100%)",
    app_section_alt_bg: "#101317",
    app_text: "#F4F5F6",
    app_text_muted: "#9BA1A6",
    app_accent: "#10B981",
    app_accent_soft: "rgba(16, 185, 129, 0.12)",
    app_accent_contrast: "#04140F",
    surface_bg: "#15181B",
    surface_raised_bg: "#1B1F23",
    border_primary: "rgba(255, 255, 255, 0.08)",
    ...buildFeatureTokens({
      pageBg: "#0B0D0F",
      surface: "#101317",
      surfaceRaised: "#1B1F23",
      text: "#F4F5F6",
      textMuted: "#9BA1A6",
      primary: "#10B981",
      primarySoft: "rgba(16, 185, 129, 0.12)",
      primaryContrast: "#04140F",
      border: "rgba(255, 255, 255, 0.08)",
      danger: "#F87171",
      success: "#34D399",
    }),
  },
};
