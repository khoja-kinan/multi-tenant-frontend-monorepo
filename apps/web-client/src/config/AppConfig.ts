export const appEnv = import.meta.env.VITE_ENVIRONMENT;

export const AppConfig = {
  isProd: appEnv === "production",
  brandName: "Nova",
  baseUrl: import.meta.env.VITE_BASE_API_URL,
};
