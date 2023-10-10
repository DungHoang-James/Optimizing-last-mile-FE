import type { Theme } from "@mui/material";

// ----------------------------------------------------------------------

export default function Card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow: theme.customShadows.z16,
          boxShadow: "none",
          border: `solid 1px ${theme.palette.grey[300]}`,
          borderRadius: theme.shape.borderRadius,
          position: "relative",
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "subtitle1" },
        subheaderTypographyProps: { variant: "body2" },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(2.5, 2.5, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2.5, 3),
        },
      },
    },
  };
}
