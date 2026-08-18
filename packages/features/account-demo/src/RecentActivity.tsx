import { FC } from "react";
import { SurfaceCard, SectionHeader, Spinner, EmptyState } from "@repo/ui";

import { useTransactions, DemoTransaction } from "./hooks/useAccountQueries";

import s from "./RecentActivity.module.scss";

const currency = (amount: number) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });

const StatusBadge: FC<{ status: DemoTransaction["status"] }> = ({ status }) => (
  <span className={`${s.status} ${s[status]}`}>{status}</span>
);

export const RecentActivity: FC = () => {
  const { data, isLoading, isError } = useTransactions();

  return (
    <SurfaceCard padding="lg" className={s.card}>
      <SectionHeader title="Recent activity" description="Latest wallet transactions." />

      {isLoading && (
        <div className={s.loading} role="status" aria-live="polite">
          <Spinner />
          <span>Loading activity…</span>
        </div>
      )}

      {!isLoading && isError && (
        <EmptyState title="Couldn't load activity" description="The mock API request failed. Try refreshing the page." />
      )}

      {!isLoading && !isError && data && data.data.length === 0 && (
        <EmptyState title="No activity yet" description="Transactions will show up here once you make one." />
      )}

      {!isLoading && !isError && data && data.data.length > 0 && (
        <ul className={s.list}>
          {data.data.map((tx) => (
            <li key={tx.id} className={s.row}>
              <div className={s.rowMain}>
                <span className={s.type}>{tx.type === "credit" ? "Deposit" : "Withdrawal"}</span>
                <span className={s.date}>{formatDate(tx.createdAt)}</span>
              </div>
              <div className={s.rowEnd}>
                <span className={`${s.amount} ${tx.type === "credit" ? s.credit : s.debit}`}>
                  {tx.type === "credit" ? "+" : "-"}
                  {currency(tx.amount)}
                </span>
                <StatusBadge status={tx.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </SurfaceCard>
  );
};
