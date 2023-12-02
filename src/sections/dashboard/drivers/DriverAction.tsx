import { Box, IconButton, Popover } from "@mui/material";
import type { MouseEvent } from "react";
import { useState } from "react";

import Iconify from "@/components/iconify";
import { STATUS_ENUM } from "@/utils/constants";

import { DriverStatus } from ".";

type Props = {
  id?: number;
  status: number;
  handleRefetch: () => void;
};

export default function DriverAction({
  id,
  status,
  handleRefetch,
}: Props): JSX.Element {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setOpen(null);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const disabled = status === STATUS_ENUM.NEW || status === STATUS_ENUM.REJECT;

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
        <DriverStatus
          id={id}
          status={status}
          handleRefetch={handleRefetch}
          handleCloseMenu={handleClose}
        />
      </Popover>
    </Box>
  );
}
