import { IconButton, Popover } from "@mui/material";
import type { MouseEvent } from "react";
import { useState } from "react";

import Iconify from "@/components/iconify";
import { NEW, REJECT } from "@/utils/constants";

import { DriverStatus } from ".";

type Props = {
  id: number;
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
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const disabled = status === NEW || status === REJECT;

  return (
    <>
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
          handleCloseMenu={handleCloseMenu}
        />
      </Popover>
    </>
  );
}
