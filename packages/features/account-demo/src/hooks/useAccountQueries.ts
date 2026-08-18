import { useQueryApi, useMutationApi } from "@repo/query";

export interface DemoProfile {
  accountId: number;
  username: string;
  displayName: string;
  membershipTier: string;
  mobile: string;
  registeredAt: string;
  unreadNotifications: number;
}

export interface DemoPreferences {
  smsNotifications: boolean;
  marketingOptIn: boolean;
}

export interface DemoBalance {
  available: number;
  pending: number;
}

export type DemoTransactionStatus = "pending" | "settled" | "failed";

export interface DemoTransaction {
  id: number;
  type: "credit" | "debit";
  amount: number;
  status: DemoTransactionStatus;
  createdAt: string;
  settledAt?: string | null;
}

interface DemoTransactionList {
  data: DemoTransaction[];
  meta: { total: number };
}

const PROFILE_KEY = ["demo-profile"];
const PREFERENCES_KEY = ["demo-preferences"];
const BALANCE_KEY = ["demo-wallet-balance"];
const TRANSACTIONS_KEY = ["demo-wallet-transactions"];

export const useProfile = () => useQueryApi<DemoProfile>({ url: "demo/profile", key: PROFILE_KEY });

export const useUpdateProfile = () =>
  useMutationApi<Partial<Pick<DemoProfile, "displayName" | "mobile">>, DemoProfile>({
    url: "demo/profile",
    method: "patch",
    invalidateOnSuccess: PROFILE_KEY,
  });

export const usePreferences = () =>
  useQueryApi<DemoPreferences>({ url: "demo/preferences", key: PREFERENCES_KEY });

export const useUpdatePreferences = () =>
  useMutationApi<Partial<DemoPreferences>, DemoPreferences>({
    url: "demo/preferences",
    method: "patch",
    invalidateOnSuccess: PREFERENCES_KEY,
  });

export const useBalance = () => useQueryApi<DemoBalance>({ url: "demo/wallet", key: BALANCE_KEY });

export const useTransactions = () =>
  useQueryApi<DemoTransactionList>({ url: "demo/wallet/transactions", key: TRANSACTIONS_KEY });
