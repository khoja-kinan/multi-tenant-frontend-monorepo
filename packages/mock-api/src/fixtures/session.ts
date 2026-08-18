export const DEMO_CREDENTIALS = {
  username: "demo@example.com",
  password: "demo1234",
};

export const DEMO_OTP_CODE = "123456";

export const DEMO_ACCOUNT_ID = 1001;

export const DEMO_SESSION = {
  token: "mock-session-token",
  tokenType: "Bearer",
  accountId: DEMO_ACCOUNT_ID,
  username: DEMO_CREDENTIALS.username,
  expiresIn: 60 * 60, // 1 hour
};
