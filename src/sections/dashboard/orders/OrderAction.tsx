import Iconify from "@/components/iconify";
import { Box, IconButton, Popover } from "@mui/material";
import { MouseEvent, useState } from "react";
import { OrderDeletePopup } from ".";
import { DELETE } from "@/utils/constants";

type Props = {
  id?: string;
  status: number;
  handleRefetch: () => void;
};

export default function OrderAction({ id, status, handleRefetch }: Props) {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const disabled = status === DELETE;

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setOpen(null);
  };

  return (
    <Box>
      <IconButton
        disabled={disabled}
        size="large"
        color="inherit"
        onClick={handleOpenMenu}
      >
        <Iconify icon={"eva:more-vertical-fill"} />
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <OrderDeletePopup
          id={id}
          disabled={disabled}
          handleRefetch={handleRefetch}
        />
      </Popover>
    </Box>
  );
}
