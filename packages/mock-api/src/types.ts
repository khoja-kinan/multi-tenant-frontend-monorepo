import { ApiRequest, ApiResult } from "@repo/api";

export type { ApiRequest, ApiResult };

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export type RouteMatch = {
  params: Record<string, string>;
};

export type RouteHandler = (
  req: ApiRequest,
  match: RouteMatch,
) => ApiResult | Promise<ApiResult>;

export type RouteDef = {
  method: HttpMethod;
  /** Path segment matched against the request URL, stripped of leading slash and query string. */
  pattern: string;
  handler: RouteHandler;
};
