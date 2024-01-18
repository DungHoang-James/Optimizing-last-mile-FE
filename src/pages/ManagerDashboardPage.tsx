import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import OverviewManager from "@/sections/dashboard/overview/manager/OverviewManager";

export default function ManagerDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container maxWidth={"xl"}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>
        <OverviewManager />
      </Container>
    </>
  );
}
