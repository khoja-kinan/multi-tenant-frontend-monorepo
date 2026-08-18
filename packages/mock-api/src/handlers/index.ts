import { RouteDef } from "../types";
import { sessionRoutes } from "./session";
import { profileRoutes } from "./profile";
import { walletRoutes } from "./wallet";
import { runtimeStatusRoutes } from "./runtimeStatus";

export const allRoutes: RouteDef[] = [
  ...sessionRoutes,
  ...profileRoutes,
  ...walletRoutes,
  ...runtimeStatusRoutes,
];
