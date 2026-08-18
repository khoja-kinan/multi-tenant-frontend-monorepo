import { DEMO_ACCOUNT_ID, DEMO_CREDENTIALS } from "./session";
import type { MockTenant } from "../tenant";

const PROFILE_FIXTURES: Record<MockTenant, { displayName: string; membershipTier: string; mobile: string }> = {
  Nova: { displayName: "Nova Demo Account", membershipTier: "Standard", mobile: "555-0100" },
  Aurora: { displayName: "Aurora Demo Account", membershipTier: "Preferred", mobile: "555-0142" },
};

export const getDemoProfile = (tenant: MockTenant) => ({
  accountId: DEMO_ACCOUNT_ID,
  username: DEMO_CREDENTIALS.username,
  ...PROFILE_FIXTURES[tenant],
  registeredAt: "2025-01-15T09:00:00.000Z",
  unreadNotifications: 0,
});

export const DEMO_PREFERENCES = {
  smsNotifications: true,
  marketingOptIn: false,
};

export const genericVerificationCode = () => ({
  hasPendingCode: false,
  expiresIn: 0,
});
