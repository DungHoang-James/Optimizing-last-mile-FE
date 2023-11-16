import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Iconify from "@/components/iconify";

export default function OrderCreate() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/dashboard/orders/new");
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleCreate}
      >
        New Manager
      </Button>
    </>
  );
}
