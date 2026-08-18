/** Which tenant's demo fixtures the mock runtime should serve. Set once at app boot. */
export type MockTenant = "Nova" | "Aurora";

const DEFAULT_TENANT: MockTenant = "Nova";

let currentTenant: MockTenant = DEFAULT_TENANT;

export const setMockTenant = (tenant: MockTenant): void => {
  currentTenant = tenant;
};

export const getMockTenant = (): MockTenant => currentTenant;
