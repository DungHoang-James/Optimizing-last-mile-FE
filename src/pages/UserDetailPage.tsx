import { Typography, Container } from "@mui/material";
import { Helmet } from "react-helmet-async";

export default function UserDetailPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          UserDetailPage
        </Typography>
      </Container>
    </>
  );
}
