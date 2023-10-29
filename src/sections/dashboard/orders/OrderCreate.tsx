import { Button } from "@mui/material";
import { useState } from "react";

import Iconify from "@/components/iconify";

import { OrderDialog } from ".";

export default function OrderCreate() {
  const [open, setOpen] = useState(false);

  const handleDialog = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleDialog}
      >
        New Manager
      </Button>
      <OrderDialog open={open} handleClose={handleDialog} status={"create"} />
    </>
  );
}
