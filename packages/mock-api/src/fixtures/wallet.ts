import { emptyMeta } from "./pagination";
import type { MockTenant } from "../tenant";

const makeTransaction = (id: number, type: "credit" | "debit", amount: number, daysAgo: number) => {
  const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString();
  return {
    id,
    type,
    amount,
    status: "settled",
    createdAt,
  };
};

const WALLET_FIXTURES: Record<
  MockTenant,
  { balance: { available: number; pending: number }; transactions: ReturnType<typeof makeTransaction>[] }
> = {
  Nova: {
    balance: { available: 1250, pending: 0 },
    transactions: [
      makeTransaction(1, "credit", 300, 1),
      makeTransaction(2, "debit", 150, 3),
      makeTransaction(3, "credit", 500, 7),
    ],
  },
  Aurora: {
    balance: { available: 2840, pending: 0 },
    transactions: [
      makeTransaction(1, "credit", 650, 1),
      makeTransaction(2, "debit", 220, 3),
      makeTransaction(3, "credit", 180, 7),
    ],
  },
};

export const getDemoBalance = (tenant: MockTenant) => ({ ...WALLET_FIXTURES[tenant].balance });

export const getDemoTransactionList = (tenant: MockTenant) => {
  const transactions = WALLET_FIXTURES[tenant].transactions;
  return {
    data: transactions,
    meta: { ...emptyMeta(1), total: transactions.length },
  };
};
