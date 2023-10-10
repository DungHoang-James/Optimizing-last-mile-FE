import type { IconifyIcon } from "@iconify/react";
import { Icon } from "@iconify/react";
import type { BoxProps, SxProps } from "@mui/material";
import { Box } from "@mui/material";
import { forwardRef } from "react";

type Props = {
  sx?: SxProps;
  width?: number | string;
  icon: IconifyIcon | string;
} & BoxProps;

const Iconify = forwardRef<BoxProps, Props>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

Iconify.displayName = "Iconify";

export default Iconify;
