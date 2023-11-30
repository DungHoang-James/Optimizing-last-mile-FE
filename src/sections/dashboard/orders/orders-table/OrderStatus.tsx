import type { SxProps } from "@mui/material";

import Label from "@/components/label";

type Props = { status: number; sx?: SxProps };

const STATUS: Status = {
  0: { label: "Created", color: "default" },
  1: { label: "Processing", color: "info" },
  2: { label: "Pick off", color: "primary" },
  3: { label: "Shipping", color: "warning" },
  4: { label: "Delivered", color: "success" },
  5: { label: "Delivery failed", color: "error" },
  6: { label: "Deleted", color: "error" },
};

export default function OrderStatus({ status, sx }: Props) {
  return (
    <Label color={STATUS[status].color} sx={sx}>
      {STATUS[status].label}
    </Label>
  );
}
