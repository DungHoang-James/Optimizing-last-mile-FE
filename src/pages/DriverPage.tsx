import { Card, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import DriverTable from "@/sections/dashboard/drivers/DriverTable";

export default function DriverPage() {
  return (
    <>
      <Helmet>
        <title>Drivers</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Drivers
          </Typography>
        </Stack>
        <Card>
          <DriverTable />
        </Card>
      </Container>
    </>
  );
}
