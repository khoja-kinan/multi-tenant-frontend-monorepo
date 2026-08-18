import { FC } from "react";

import { AccountSummary } from "./AccountSummary";
import { ProfileForm } from "./ProfileForm";
import { SecuritySettings } from "./SecuritySettings";
import { RecentActivity } from "./RecentActivity";

import s from "./AccountDemoPage.module.scss";

/**
 * The full account demo, composed once here and mounted identically by
 * every tenant app — cross-tenant reuse comes entirely from the ambient
 * theme tokens, not from any tenant-specific branching in this component.
 */
export const AccountDemoPage: FC = () => (
  <div className={s.page}>
    <AccountSummary />
    <div className={s.grid}>
      <ProfileForm />
      <SecuritySettings />
    </div>
    <RecentActivity />
  </div>
);
