import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogTitle, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useMutation } from "react-query";

import Iconify from "@/components/iconify";
import { deleteOrderMutation } from "@/mutations/order";

type Props = {
  id?: string;
  disabled: boolean;
  handleRefetch: () => void;
};

export default function OrderDeletePopup({
  id,
  disabled,
  handleRefetch,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation(deleteOrderMutation, {
    onSuccess: () => {
      toggleLoading();
      handleRefetch();
      handleClose();
    },
    onError: () => {
      toggleLoading();
      handleRefetch();
      handleClose();
    },
  });

  const handleClickOpen = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setOpen(false);
  };

  const toggleLoading = () => {
    setLoading((prev) => !prev);
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    if (id) {
      toggleLoading();
      mutate(id);
    }
  };

  return (
    <>
      <MenuItem
        disabled={disabled}
        sx={{ color: "error.main" }}
        onClick={handleClickOpen}
      >
        <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
        Delete
      </MenuItem>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure want to delete?
        </DialogTitle>
        <DialogActions>
          <LoadingButton
            variant={"outlined"}
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant={"contained"}
            color={"error"}
            onClick={handleDelete}
            loading={loading}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
