import React from "react";
import { AppShell, PageContainer, ThemeBadge } from "@repo/ui";
import { AuthProvider, ProtectedRoute, LoginFlow } from "@repo/auth-demo";
import { AccountDemoPage } from "@repo/account-demo";

import s from "./account.module.scss";

const AccountScreen: React.FC = () => {
  return (
    <AppShell
      header={
        <PageContainer className={s.headerBar}>
          <a href="/" className={s.wordmark}>
            AURORA
          </a>
        </PageContainer>
      }
      footer={
        <PageContainer className={s.footerBar}>
          <span>Multi-Tenant Frontend Monorepo — portfolio architecture demo.</span>
          <span className={s.footerMeta}>No backend required. Mock runtime enabled by default.</span>
        </PageContainer>
      }
    >
      <PageContainer className={s.content}>
        <div className={s.intro}>
          <ThemeBadge label="Aurora · Account Demo" />
          <h1 className={s.title}>Account architecture, live</h1>
          <p className={s.subtitle}>
            A compact auth + account feature pair (<code>@repo/auth-demo</code>, <code>@repo/account-demo</code>)
            shared with Nova — identical implementation, tenant-specific theme only.
          </p>
        </div>

        <AuthProvider>
          <ProtectedRoute fallback={<LoginFlow />}>
            <AccountDemoPage />
          </ProtectedRoute>
        </AuthProvider>
      </PageContainer>
    </AppShell>
  );
};

export default AccountScreen;
