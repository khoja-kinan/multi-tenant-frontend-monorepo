export { AccountDemoPage } from "./AccountDemoPage";
export { AccountSummary } from "./AccountSummary";
export { ProfileForm } from "./ProfileForm";
export { SecuritySettings } from "./SecuritySettings";
export { RecentActivity } from "./RecentActivity";

export {
  useProfile,
  useUpdateProfile,
  usePreferences,
  useUpdatePreferences,
  useBalance,
  useTransactions,
} from "./hooks/useAccountQueries";
export type { DemoProfile, DemoPreferences, DemoBalance, DemoTransaction } from "./hooks/useAccountQueries";
