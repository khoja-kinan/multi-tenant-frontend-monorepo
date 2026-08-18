import { ApiError, type ApiRequest, type ApiResult } from "@repo/api";
import { RouteDef } from "./types";
import { matchPattern, normalizeUrl, simulateLatency } from "./utils";

export const createDispatcher = (routes: RouteDef[]) => {
  return async (req: ApiRequest): Promise<ApiResult> => {
    await simulateLatency();

    const path = normalizeUrl(req.url);
    const method = req.method;

    for (const route of routes) {
      if (route.method !== method) continue;

      const params = matchPattern(route.pattern, path);
      if (!params) continue;

      return route.handler(req, { params });
    }

    // No handler matched: fail loudly rather than silently falling through
    // to a real network call.
    const message = `No mock handler registered for ${method.toUpperCase()} ${req.url}`;
    console.error(`[mock-api] ${message}`);
    throw new ApiError(501, { message }, message);
  };
};
