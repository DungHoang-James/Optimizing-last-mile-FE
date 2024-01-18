import { Card, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { ManagerCreate } from "@/sections/dashboard/managers";
import ManagersTable from "@/sections/dashboard/managers/ManagersTable";

export default function ManagersPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Manager Account</title>
      </Helmet>
      <Container maxWidth={"xl"}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Manager Account
          </Typography>
          <ManagerCreate />
        </Stack>
        <Card>
          <ManagersTable />
        </Card>
      </Container>
    </>
  );
}
