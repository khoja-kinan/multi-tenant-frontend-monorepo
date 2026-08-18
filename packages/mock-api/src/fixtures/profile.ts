import { DEMO_ACCOUNT_ID, DEMO_CREDENTIALS } from "./session";

export const DEMO_PROFILE = {
  accountId: DEMO_ACCOUNT_ID,
  username: DEMO_CREDENTIALS.username,
  displayName: "Demo Account",
  membershipTier: "Standard",
  mobile: "555-0100",
  registeredAt: "2025-01-15T09:00:00.000Z",
  unreadNotifications: 0,
};

export const DEMO_PREFERENCES = {
  smsNotifications: true,
  marketingOptIn: false,
};

export const genericVerificationCode = () => ({
  hasPendingCode: false,
  expiresIn: 0,
});
