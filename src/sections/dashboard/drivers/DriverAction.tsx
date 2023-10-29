import { IconButton, Popover } from "@mui/material";
import type { MouseEvent } from "react";
import { useState } from "react";

import Iconify from "@/components/iconify";

type Props = {
  id?: number;
  status: number;
};

export default function DriverAction({ id, status }: Props): JSX.Element {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
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
        {/* <DriverStatus status={status} /> */}
      </Popover>
    </>
  );
}
