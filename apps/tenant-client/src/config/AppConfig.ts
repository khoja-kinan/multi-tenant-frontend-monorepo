export const appEnv = import.meta.env.VITE_ENVIRONMENT;

export const AppConfig = {
  isProd: appEnv === "production",
  brandName: "Aurora",
  baseUrl: import.meta.env.VITE_BASE_API_URL,
};
