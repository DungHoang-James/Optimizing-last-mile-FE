import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { ManagerForm } from "@/sections/dashboard/managers";

export default function ManagerPage() {
  // TODO: CHANGE PAGE TO MODAL
  return (
    <>
      <Helmet>
        <title>Create Manager</title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Create Manager
        </Typography>
        <ManagerForm />
      </Container>
    </>
  );
}
