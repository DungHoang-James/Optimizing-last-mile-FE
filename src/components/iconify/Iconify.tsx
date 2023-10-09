import { Icon, IconifyIcon } from "@iconify/react";
import { Box, BoxProps, SxProps } from "@mui/material";
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
