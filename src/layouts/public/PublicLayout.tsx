import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks";

export default function PublicLayout() {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      return navigate("dashboard/manager", { replace: true });
    }
    return navigate("login", { replace: true });
  }, [state.isAuthenticated]);

  if (state.loading || state.isAuthenticated) return <LinearProgress />;
  return (
    <>
      <Outlet />
    </>
  );
}
