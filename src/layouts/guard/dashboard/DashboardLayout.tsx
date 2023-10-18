import { LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import { useAuth } from "@/hooks";

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
  const { state } = useAuth();

  useEffect(() => {
    if (!state.isAuthenticated) return navigate("/login", { replace: true });
    return navigate("/dashboard/managers", { replace: true });
  }, [state.isAuthenticated]);

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
