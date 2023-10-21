import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

import Iconify from "@/components/iconify";

import { ManagerForm } from ".";

export default function ManagerCreate(): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}
      >
        New Manager
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={"lg"} fullWidth>
        <DialogTitle>Create Manager</DialogTitle>
        <DialogContent
          sx={{
            ".MuiDialogContent-root&.MuiDialogContent-root": {
              pt: 2,
            },
          }}
        >
          <ManagerForm />
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color={"inherit"} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={"contained"} onClick={handleClose}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
