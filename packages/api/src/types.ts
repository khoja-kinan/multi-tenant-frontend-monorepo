export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export interface ApiRequest<Payload = unknown, Params = unknown> {
  url: string;
  method: HttpMethod;
  params?: Params;
  data?: Payload;
  headers?: Record<string, string>;
  /** Skips the auth-token requirement when making a real (non-mocked) request. */
  isPublicApi?: boolean;
  timeout?: number;
}

export interface ApiResult<Data = unknown> {
  data: Data;
  status?: number;
}

export interface ApiAuth {
  getToken: () => string | undefined;
  onUnauthorized?: () => void;
}

export interface ApiEnvironment {
  baseUrl: string;
  auth?: ApiAuth;
}
