import { Collapse, Toolbar, Typography, alpha } from "@mui/material";

import { useOrders } from "@/hooks";

import OrderDriverDialog from "../order-driver-dialog/OrderDriverDialog";

export default function OrderEnhancedTableToolbar() {
  const {
    state: { numSelected },
  } = useOrders();

  return (
    <>
      <Collapse in={numSelected > 0}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          <>
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
            <OrderDriverDialog />
          </>
        </Toolbar>
      </Collapse>
    </>
  );
}
