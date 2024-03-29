import { styled } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import { useAuth, useCurrentPath } from "@/hooks";
import {
  ADMIN_PATH,
  ADMIN_ROUTES,
  MANAGER_PATH,
  MANAGER_ROUTES,
} from "@/routes/routes";

import Header from "./header";
import Nav from "./nav";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout(): JSX.Element {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useAuth();

  const currentPath = useCurrentPath(
    ADMIN_ROUTES.concat(MANAGER_ROUTES),
    location
  );

  useEffect(() => {
    if (!currentPath) {
      return state.role === "ADMIN"
        ? navigate(ADMIN_PATH[0], { replace: true })
        : navigate(MANAGER_PATH[0], { replace: true });
    }
    const isValidPath =
      state.role === "ADMIN"
        ? ADMIN_PATH.includes(currentPath)
        : MANAGER_PATH.includes(currentPath);

    if (!state.isAuthenticated && !state.role) {
      return navigate("/login", { replace: true });
    }
    if (isValidPath) {
      return navigate(location.pathname, { replace: true });
    }
    return navigate(state.role === "ADMIN" ? ADMIN_PATH[0] : MANAGER_PATH[0], {
      replace: true,
    });
  }, [state.isAuthenticated, state.role, currentPath]);

  const handleToggleNav = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  if (state.loading || !state.isAuthenticated)
    return <Navigate to={"/login"} />;
  return (
    <StyledRoot>
      <Header onOpenNav={handleToggleNav} />
      <Nav openNav={open} onCloseNav={handleToggleNav} />
      <Main>
        <ScrollToTop />
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
