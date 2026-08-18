import { DEMO_BALANCE } from "./fixtures/wallet";
import { DEMO_PROFILE } from "./fixtures/profile";
import { DEMO_SESSION } from "./fixtures/session";

export type TransactionStatus = "pending" | "settled" | "failed";

export type MockTransaction = {
  id: number;
  type: "credit" | "debit";
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  settledAt: string | null;
};

type State = {
  isAuthenticated: boolean;
  session: typeof DEMO_SESSION | null;
  profile: typeof DEMO_PROFILE;
  balance: typeof DEMO_BALANCE;
  transactions: Map<number, MockTransaction>;
  nextTransactionId: number;
};

const createInitialState = (): State => ({
  isAuthenticated: false,
  session: null,
  profile: { ...DEMO_PROFILE },
  balance: { ...DEMO_BALANCE },
  transactions: new Map(),
  nextTransactionId: 5001,
});

export const mockState: State = createInitialState();

export const resetMockState = () => {
  Object.assign(mockState, createInitialState());
};

export const login = () => {
  mockState.isAuthenticated = true;
  mockState.session = { ...DEMO_SESSION };
};

export const logout = () => {
  mockState.isAuthenticated = false;
  mockState.session = null;
};

/**
 * Creates a pending transaction and auto-settles it shortly after, the way
 * a real payment processor callback would arrive asynchronously.
 */
export const createTransaction = (type: "credit" | "debit", amount: number): MockTransaction => {
  const id = mockState.nextTransactionId++;
  const transaction: MockTransaction = {
    id,
    type,
    amount,
    status: "pending",
    createdAt: new Date().toISOString(),
    settledAt: null,
  };

  mockState.transactions.set(id, transaction);

  setTimeout(() => {
    const current = mockState.transactions.get(id);
    if (current && current.status === "pending") {
      current.status = "settled";
      current.settledAt = new Date().toISOString();
      mockState.balance.available += type === "credit" ? amount : -amount;
    }
  }, 8000);

  return transaction;
};
