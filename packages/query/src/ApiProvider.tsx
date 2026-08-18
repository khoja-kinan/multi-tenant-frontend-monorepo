import { createContext, useContext, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import type { ApiAuth } from "@repo/api";

export interface ApiEnvironment {
  baseUrl: string;
  auth?: ApiAuth;
}

const ApiEnvironmentContext = createContext<ApiEnvironment | null>(null);

/** Reads the `{ baseUrl, auth }` an app supplied to the nearest `<ApiProvider>`. */
export const useApiEnvironment = (): ApiEnvironment => {
  const env = useContext(ApiEnvironmentContext);
  if (!env) throw new Error("useApiEnvironment must be used inside <ApiProvider>");
  return env;
};

/**
 * Owns the React Query client and makes `{ baseUrl, auth }` available to
 * `useQueryApi`/`useMutationApi` anywhere below it. One provider per app —
 * there is no separate "create a client, then pass it down" step.
 */
export const ApiProvider = ({ baseUrl, auth, children }: ApiEnvironment & { children: ReactNode }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
      }),
  );

  return (
    <ApiEnvironmentContext.Provider value={{ baseUrl, auth }}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ApiEnvironmentContext.Provider>
  );
};
