import { ThemeDefinition, buildFeatureTokens } from "@repo/theme";

// Aurora — light warm-neutral surface with a cobalt accent. A deliberately
// fresh palette: no relation to Nova's graphite/emerald system.
export const BaseTheme: ThemeDefinition = {
  tokens: {
    app_bg: "#F7F5F2",
    app_header_bg: "rgba(247, 245, 242, 0.85)",
    app_hero_bg: "linear-gradient(180deg, #FFFFFF 0%, #F1EEE9 100%)",
    app_section_alt_bg: "#FFFFFF",
    app_text: "#1F2328",
    app_text_muted: "#6B7178",
    app_accent: "#34558B",
    app_accent_soft: "rgba(52, 85, 139, 0.10)",
    app_accent_contrast: "#FFFFFF",
    surface_bg: "#FFFFFF",
    surface_raised_bg: "#F1EEE9",
    border_primary: "rgba(31, 35, 40, 0.08)",
    ...buildFeatureTokens({
      pageBg: "#F7F5F2",
      surface: "#FFFFFF",
      surfaceRaised: "#F1EEE9",
      text: "#1F2328",
      textMuted: "#6B7178",
      primary: "#34558B",
      primarySoft: "rgba(52, 85, 139, 0.10)",
      primaryContrast: "#FFFFFF",
      border: "rgba(31, 35, 40, 0.08)",
      danger: "#DC2626",
      success: "#3F8F5F",
    }),
  },
};
