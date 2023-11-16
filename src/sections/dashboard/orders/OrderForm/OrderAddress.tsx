import { Card, Stack, Typography } from "@mui/material";

import OrderGoongMap from "./OrderGoongMap";
import OrderShippingAddress from "./OrderShippingAddress";

type Props = {
  disabled: boolean;
};

export default function OrderAddress({ disabled }: Props) {
  return (
    <Card
      sx={{
        py: 2,
        px: 2.5,
      }}
    >
      <Stack spacing={2}>
        <Typography variant={"h6"}>Order Address</Typography>
        <OrderShippingAddress disabled={disabled} />
        <OrderGoongMap />
      </Stack>
    </Card>
  );
}
