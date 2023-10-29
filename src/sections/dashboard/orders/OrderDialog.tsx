import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRef } from "react";

import { Loading } from "@/components/loading";

import { OrderForm } from ".";

type Props = {
  open: boolean;
  handleClose: () => void;
  status: "create" | "edit";
  loading?: boolean;
};

export default function OrderDialog({
  open,
  handleClose,
  status,
  loading,
}: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  const labelStatus = status === "create" ? "Create" : "Edit";

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={"lg"} fullWidth>
        <DialogTitle>{labelStatus} Manager</DialogTitle>
        <DialogContent
          sx={{
            ".MuiDialogContent-root&.MuiDialogContent-root": {
              pt: 2,
            },
          }}
        >
          {loading ? <Loading /> : <OrderForm />}
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color={"inherit"} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={"contained"} onClick={handleSubmit}>
            {labelStatus}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
