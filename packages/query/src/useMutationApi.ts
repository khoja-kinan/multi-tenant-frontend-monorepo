import { useMutation, useQueryClient, type QueryKey, type UseMutationOptions } from "react-query";
import { sendRequest, type ApiError, type HttpMethod } from "@repo/api";

import { useApiEnvironment } from "./ApiProvider";

interface UseMutationApiArgs<Payload, Data> {
  url: string;
  method: HttpMethod;
  /** Query key to refetch after a successful mutation. */
  invalidateOnSuccess?: QueryKey;
  options?: UseMutationOptions<Data, ApiError, Payload>;
}

/** Sends `payload` to `url` via `method` through the shared mock/live transport. */
export const useMutationApi = <Payload = unknown, Data = unknown>({
  url,
  method,
  invalidateOnSuccess,
  options,
}: UseMutationApiArgs<Payload, Data>) => {
  const env = useApiEnvironment();
  const queryClient = useQueryClient();

  return useMutation<Data, ApiError, Payload>({
    mutationFn: async (payload) => {
      const result = await sendRequest<Data, Payload>({ url, method, data: payload }, env);
      return result.data;
    },
    ...options,
    onSuccess: (data, variables, context) => {
      if (invalidateOnSuccess) queryClient.invalidateQueries(invalidateOnSuccess);
      options?.onSuccess?.(data, variables, context);
    },
  });
};
