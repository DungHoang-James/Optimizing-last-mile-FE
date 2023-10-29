import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogTitle, MenuItem } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";

import Iconify from "@/components/iconify";
import { deleteManagerService } from "@/services/manager";

type Props = {
  id?: number;
  handleRefetch: () => void;
};

export default function ManagerDeletePopup({ id, handleRefetch }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation(deleteManagerService, {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleLoading = () => {
    setLoading((prev) => !prev);
  };

  const handleDelete = () => {
    if (id) {
      toggleLoading();
      mutate(id);
    }
  };

  return (
    <>
      <MenuItem sx={{ color: "error.main" }} onClick={handleClickOpen}>
        <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
        Delete
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
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
