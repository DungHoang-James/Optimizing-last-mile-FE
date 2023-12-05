import { useLocation } from "react-router-dom";

import { ROUTES_PATH } from "@/routes/routes";

export function useBreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/");

  return pathnames.map((_, index) => {
    // const last = index === pathnames.length - 1;
    const to = `${pathnames.slice(0, index + 1).join("/")}`;
    return ROUTES_PATH[to];
  });
}
