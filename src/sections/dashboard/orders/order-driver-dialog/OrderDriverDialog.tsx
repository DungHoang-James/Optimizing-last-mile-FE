import { PersonAddAlt1 as DriverAddIcon } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Tooltip,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import type { ReactElement, Ref } from "react";
import { forwardRef, useCallback, useState } from "react";

import { useOrders } from "@/hooks";
import OrderDialogProvider from "@/providers/Orders/OrdersDialog/OrderDialogProvider";

import OrderDriverDialogActions from "./OrderDriverDialogActions";
import OrderDriverDialogForm from "./OrderDriverDialogForm";
import OrderDriverDialogTable from "./OrderDriverDialogTable";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderDriverDialog() {
  const {
    state: { numSelected },
  } = useOrders();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Tooltip title={`Add ${numSelected} Selected Order to Driver`}>
        <IconButton onClick={handleClickOpen}>
          <DriverAddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="order-add-driver-dialog-slide"
        maxWidth={"md"}
        fullWidth
      >
        {open && (
          <OrderDialogProvider>
            <DialogTitle>{`Assign ${numSelected} Orders to Driver`}</DialogTitle>
            <DialogContent>
              <DialogContentText
                component={Box}
                id="order-add-driver-dialog-slide"
              >
                <Stack spacing={2}>
                  <OrderDriverDialogForm />
                  <OrderDriverDialogTable />
                </Stack>
              </DialogContentText>
            </DialogContent>
            <OrderDriverDialogActions handleClose={handleClose} />
          </OrderDialogProvider>
        )}
      </Dialog>
    </>
  );
}
