import { LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Logo from "@/components/logo";
import { useAuth } from "@/hooks";

const StyledHeader = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

export default function PublicLayout(): JSX.Element {
  const navigate = useNavigate();
  const { state } = useAuth();

  useEffect(() => {
    if (!state.isAuthenticated) return navigate("/login", { replace: true });
    return navigate("/dashboard/manager", { replace: true });
  }, [state.isAuthenticated]);

  if (state.loading || state.isAuthenticated) return <LinearProgress />;
  return (
    <>
      <StyledHeader>
        <Logo />
      </StyledHeader>

      <Outlet />
    </>
  );
}
