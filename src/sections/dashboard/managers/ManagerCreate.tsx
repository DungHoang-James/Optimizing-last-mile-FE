import { Button } from "@mui/material";
import { useState } from "react";

import Iconify from "@/components/iconify";

import { ManagerDialog } from ".";

export default function ManagerCreate(): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleDialog = () => {
    setOpen((prev) => !prev);
  };

  const defaultValues = {
    username: "",
    password: "",
    name: "",
    birthDay: null as unknown as Date,
    province: "",
    district: "",
    ward: "",
    address: "",
    phoneContact: "",
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
      <ManagerDialog
        open={open}
        handleClose={handleDialog}
        status={"create"}
        defaultValues={defaultValues}
      />
    </>
  );
}
