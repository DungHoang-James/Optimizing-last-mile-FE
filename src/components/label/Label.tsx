import { Box, BoxProps } from "@mui/material";
import { SxProps, useTheme } from "@mui/material/styles";
import { PropsWithChildren, forwardRef } from "react";

import { StyledLabel } from "./styles";

// ----------------------------------------------------------------------

export type Variant = "filled" | "outlined" | "ghost" | "soft";
export type Color =
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

type Props = {
  sx?: SxProps;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  variant?: Variant;
  color?: Color;
} & PropsWithChildren &
  BoxProps;

const Label = forwardRef<BoxProps, Props>(
  (
    {
      children,
      color = "default",
      variant = "soft",
      startIcon,
      endIcon,
      sx,
      ...other
    },
    ref
  ) => {
    const theme = useTheme();

    const iconStyle = {
      width: 16,
      height: 16,
      "& svg, img": { width: 1, height: 1, objectFit: "cover" },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && <Box sx={{ mr: 0.75, ...iconStyle }}> {startIcon} </Box>}

        {children}

        {endIcon && <Box sx={{ ml: 0.75, ...iconStyle }}> {endIcon} </Box>}
      </StyledLabel>
    );
  }
);

Label.displayName = "Label";

export default Label;
