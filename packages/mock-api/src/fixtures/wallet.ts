import { emptyMeta } from "./pagination";

export const DEMO_BALANCE = {
  available: 1250,
  pending: 0,
};

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

export const DEMO_TRANSACTIONS = [
  makeTransaction(1, "credit", 300, 1),
  makeTransaction(2, "debit", 150, 3),
  makeTransaction(3, "credit", 500, 7),
];

export const DEMO_TRANSACTION_LIST = {
  data: DEMO_TRANSACTIONS,
  meta: { ...emptyMeta(1), total: DEMO_TRANSACTIONS.length },
};
