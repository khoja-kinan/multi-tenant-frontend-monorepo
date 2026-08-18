import { RouteDef } from "../types";
import { mockState, createTransaction } from "../state";
import { DEMO_TRANSACTION_LIST } from "../fixtures/wallet";

export const walletRoutes: RouteDef[] = [
  {
    method: "get",
    pattern: "demo/wallet",
    handler: () => ({ data: mockState.balance }),
  },
  {
    method: "get",
    pattern: "demo/wallet/transactions",
    handler: () => ({ data: DEMO_TRANSACTION_LIST }),
  },
  {
    method: "post",
    pattern: "demo/wallet/transactions",
    handler: (req) => {
      const body = (req.data ?? {}) as { type?: "credit" | "debit"; amount?: number };
      const transaction = createTransaction(body.type === "debit" ? "debit" : "credit", Number(body.amount ?? 0));
      return { data: transaction };
    },
  },
];
