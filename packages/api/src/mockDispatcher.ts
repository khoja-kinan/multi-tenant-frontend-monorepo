import type { ApiRequest, ApiResult } from "./types";

export type MockDispatcher = (req: ApiRequest) => Promise<ApiResult>;

let dispatcher: MockDispatcher | null = null;

/** Registers (or clears, with null) the dispatcher `sendRequest` prefers over a real fetch. */
export const setMockDispatcher = (fn: MockDispatcher | null): void => {
  dispatcher = fn;
};

export const getMockDispatcher = (): MockDispatcher | null => dispatcher;
