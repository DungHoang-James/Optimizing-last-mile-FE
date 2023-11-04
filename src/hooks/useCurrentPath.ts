import type { Location, RouteObject } from "react-router-dom";
import { matchRoutes } from "react-router-dom";

export function useCurrentPath(routes: RouteObject[], location: Location) {
  const route = matchRoutes(routes, location);

  return route?.[0].route.path;
}
