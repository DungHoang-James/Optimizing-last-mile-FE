import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { OrderForm } from "@/sections/dashboard/orders";

export default function OrderCreatePage() {
  return (
    <>
      <Helmet>
        <title>New Order</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            New Order
          </Typography>
        </Stack>
        <OrderForm status={"new"} />
      </Container>
    </>
  );
}
