import { FC } from "react";
import { SurfaceCard, SectionHeader, Toggle, Button, Spinner } from "@repo/ui";
import { useSessionStore, useRefreshSessionMutation, useLogoutMutation } from "@repo/auth-demo";

import { usePreferences, useUpdatePreferences } from "./hooks/useAccountQueries";

import s from "./SecuritySettings.module.scss";

export const SecuritySettings: FC = () => {
  const { data, isLoading } = usePreferences();
  const { mutate: updatePreferences, isLoading: isSaving } = useUpdatePreferences();

  const session = useSessionStore((store) => store.session);
  const { mutate: refreshSession, isLoading: isRefreshing } = useRefreshSessionMutation();
  const { mutate: logout, isLoading: isLoggingOut } = useLogoutMutation();

  return (
    <SurfaceCard padding="lg" className={s.card}>
      <SectionHeader title="Security & notifications" description="Session controls and contact preferences." />

      <div className={s.session}>
        <div className={s.sessionText}>
          <span className={s.sessionLabel}>Signed in as {session?.username}</span>
          <span className={s.sessionMeta}>Session token expires in {Math.round((session?.expiresIn ?? 0) / 60)} min</span>
        </div>
        <div className={s.sessionActions}>
          <Button type="button" variant="secondary" disabled={isRefreshing} onClick={() => refreshSession({})}>
            {isRefreshing ? "Refreshing…" : "Refresh session"}
          </Button>
          <Button type="button" variant="ghost" disabled={isLoggingOut} onClick={() => logout({})}>
            {isLoggingOut ? "Signing out…" : "Sign out"}
          </Button>
        </div>
      </div>

      <div className={s.divider} />

      {isLoading ? (
        <div className={s.loading} role="status" aria-live="polite">
          <Spinner />
          <span>Loading preferences…</span>
        </div>
      ) : (
        data && (
          <div className={s.toggles}>
            <Toggle
              label="SMS notifications"
              description="Get a text for important account activity."
              checked={data.smsNotifications}
              disabled={isSaving}
              onChange={(next) => updatePreferences({ smsNotifications: next })}
            />
            <Toggle
              label="Marketing emails"
              description="Occasional product updates — off by default."
              checked={data.marketingOptIn}
              disabled={isSaving}
              onChange={(next) => updatePreferences({ marketingOptIn: next })}
            />
          </div>
        )
      )}
    </SurfaceCard>
  );
};
