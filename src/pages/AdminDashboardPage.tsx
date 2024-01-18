import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { OverviewAdmin } from "@/sections/dashboard/overview/admin";

export default function AdminDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container maxWidth={"xl"}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>
        <OverviewAdmin />
      </Container>
    </>
  );
}
