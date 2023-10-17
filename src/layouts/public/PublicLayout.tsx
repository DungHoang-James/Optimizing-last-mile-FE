import { styled } from "@mui/material/styles";
import { Outlet, redirect } from "react-router-dom";

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
  const { state } = useAuth();

  if (state.isAuthenticated) {
    redirect("/dashboard/manager");
  }
  return (
    <>
      <StyledHeader>
        <Logo />
      </StyledHeader>

      <Outlet />
    </>
  );
}
