import { ApiProvider } from "@repo/query";
import { useSessionStore } from "@repo/auth-demo";

import { AppConfig } from "config/AppConfig";

const QueryProvider = ({ children }: { children: React.ReactNode }) => (
  <ApiProvider
    baseUrl={AppConfig.baseUrl}
    auth={{
      getToken: () => useSessionStore.getState().session?.token,
      onUnauthorized: () => useSessionStore.getState().clearSession(),
    }}
  >
    {children}
  </ApiProvider>
);

export default QueryProvider;
