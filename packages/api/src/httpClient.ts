import { ApiError } from "./ApiError";
import { getMockDispatcher } from "./mockDispatcher";
import type { ApiEnvironment, ApiRequest, ApiResult } from "./types";

const toQueryString = (params?: Record<string, unknown>): string => {
  if (!params) return "";
  const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null);
  if (entries.length === 0) return "";
  return `?${new URLSearchParams(entries as [string, string][]).toString()}`;
};

const readBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const fetchLive = async <Data, Payload, Params>(
  request: ApiRequest<Payload, Params>,
  env: ApiEnvironment,
): Promise<ApiResult<Data>> => {
  const token = env.auth?.getToken();
  if (!request.isPublicApi && !token) {
    throw new ApiError(401, null, "Missing auth token");
  }

  const response = await fetch(`${env.baseUrl}${request.url}${toQueryString(request.params as Record<string, unknown> | undefined)}`, {
    method: request.method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...request.headers,
    },
    body: request.data !== undefined ? JSON.stringify(request.data) : undefined,
    signal: request.timeout ? AbortSignal.timeout(request.timeout) : undefined,
  });

  const body = await readBody(response);

  if (response.status === 401) env.auth?.onUnauthorized?.();
  if (!response.ok) throw new ApiError(response.status, body, `Request failed with status ${response.status}`);

  return { data: body as Data, status: response.status };
};

/**
 * Single entry point every query/mutation hook calls through. Prefers a
 * registered mock dispatcher when one is present; otherwise makes a real
 * fetch request against `env.baseUrl`.
 */
export const sendRequest = <Data = unknown, Payload = unknown, Params = unknown>(
  request: ApiRequest<Payload, Params>,
  env: ApiEnvironment,
): Promise<ApiResult<Data>> => {
  const mock = getMockDispatcher();
  if (mock) return mock(request) as Promise<ApiResult<Data>>;

  return fetchLive<Data, Payload, Params>(request, env);
};
