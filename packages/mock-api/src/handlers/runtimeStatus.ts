import { RouteDef } from "../types";
import { DEMO_RUNTIME_STATUS } from "../fixtures/runtimeStatus";

export const runtimeStatusRoutes: RouteDef[] = [
  {
    method: "get",
    pattern: "demo/runtime-status",
    handler: () => ({ data: DEMO_RUNTIME_STATUS }),
  },
];
