import type { Theme } from "@mui/material";

// ----------------------------------------------------------------------

export default function FormLabel(theme: Theme) {
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          ...theme.typography.subtitle2,
        },
        asterisk: {
          color: theme.palette.error.dark,
        },
      },
    },
  };
}
