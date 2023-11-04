import type { TypographyProps } from "@mui/material";
import { Typography as MuiTypography } from "@mui/material";
import type { PropsWithChildren } from "react";

export default function Typography({
  children,
  ...rest
}: PropsWithChildren & TypographyProps) {
  return (
    <MuiTypography
      {...rest}
      sx={{
        wordBreak: "break-word",
        wordWrap: "break-word",
      }}
    >
      {children}
    </MuiTypography>
  );
}
