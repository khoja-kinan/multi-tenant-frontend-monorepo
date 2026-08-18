import { FC } from "react";
import { SurfaceCard, StatCard, Spinner, EmptyState } from "@repo/ui";

import { useProfile, useBalance } from "./hooks/useAccountQueries";

import s from "./AccountSummary.module.scss";

const currency = (amount: number) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

const memberSince = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long" });

export const AccountSummary: FC = () => {
  const profile = useProfile();
  const balance = useBalance();

  const isLoading = profile.isLoading || balance.isLoading;
  const isError = profile.isError || balance.isError;

  return (
    <SurfaceCard level="raised" padding="lg" className={s.card}>
      {isLoading && (
        <div className={s.loading} role="status" aria-live="polite">
          <Spinner />
          <span>Loading account…</span>
        </div>
      )}

      {!isLoading && isError && (
        <EmptyState title="Couldn't load account summary" description="The mock API request failed. Try refreshing." />
      )}

      {!isLoading && !isError && profile.data && balance.data && (
        <>
          <div className={s.identity}>
            <span className={s.name}>{profile.data.displayName}</span>
            <span className={s.meta}>
              {profile.data.membershipTier} member since {memberSince(profile.data.registeredAt)}
            </span>
          </div>
          <div className={s.stats}>
            <StatCard label="Available balance" value={currency(balance.data.available)} />
            <StatCard label="Pending" value={currency(balance.data.pending)} />
            <StatCard label="Notifications" value={profile.data.unreadNotifications} />
          </div>
        </>
      )}
    </SurfaceCard>
  );
};
