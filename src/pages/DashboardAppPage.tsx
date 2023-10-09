import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
      </Container>
    </>
  );
}
