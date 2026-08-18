import { useQuery, type QueryKey, type UseQueryOptions } from "react-query";
import { sendRequest, type ApiError } from "@repo/api";

import { useApiEnvironment } from "./ApiProvider";

interface UseQueryApiArgs<Data> {
  url: string;
  key: QueryKey;
  isPublicApi?: boolean;
  options?: UseQueryOptions<Data, ApiError>;
}

/** Fetches `url` (GET) through the shared mock/live transport and caches it under `key`. */
export const useQueryApi = <Data = unknown>({ url, key, isPublicApi, options }: UseQueryApiArgs<Data>) => {
  const env = useApiEnvironment();

  return useQuery<Data, ApiError>({
    queryKey: key,
    queryFn: async () => {
      const result = await sendRequest<Data>({ url, method: "get", isPublicApi }, env);
      return result.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};
