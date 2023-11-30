import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import OrderProvider from "@/providers/Orders/OrderProvider";
import { OrderCreate, OrdersTable } from "@/sections/dashboard/orders";

export default function OrderPage() {
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <Container maxWidth={"xl"}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
          <OrderCreate />
        </Stack>
        <OrderProvider>
          <OrdersTable />
        </OrderProvider>
      </Container>
    </>
  );
}
