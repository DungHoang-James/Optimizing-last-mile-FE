import { LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import { useAuth } from "@/hooks";
import { ADMIN_PATH, MANAGER_PATH } from "@/routes/routes";

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

  const isValidPath =
    state.role === "ADMIN"
      ? ADMIN_PATH.includes(location.pathname)
      : MANAGER_PATH.includes(location.pathname);

  useEffect(() => {
    if (!state.isAuthenticated && !state.role) {
      return navigate("/login", { replace: true });
    }
    if (isValidPath) {
      return navigate(location.pathname, { replace: true });
    }
    return navigate(state.role === "ADMIN" ? ADMIN_PATH[0] : MANAGER_PATH[0], {
      replace: true,
    });
  }, [state.isAuthenticated, state.role]);

  if (state.loading || !state.isAuthenticated) return <LinearProgress />;
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>
        <ScrollToTop />
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
