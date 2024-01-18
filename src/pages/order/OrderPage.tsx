import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import OrderProvider from "@/providers/Orders/OrderProvider";
import { OrderCreate, OrdersTable } from "@/sections/dashboard/orders";
import OrderUploadFile from "@/sections/dashboard/orders/oder-upload-file/OrderUploadFile";
import OrderAutoAssignDriver from "@/sections/dashboard/orders/OrderAutoAssignDriver";

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
          <Stack direction={"row"} spacing={2}>
            <OrderUploadFile />
            <OrderAutoAssignDriver />
            <OrderCreate />
          </Stack>
        </Stack>
        <OrderProvider>
          <OrdersTable />
        </OrderProvider>
      </Container>
    </>
  );
}
