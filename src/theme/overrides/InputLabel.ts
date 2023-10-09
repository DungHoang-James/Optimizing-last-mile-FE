import { Theme } from "@mui/material";

// ----------------------------------------------------------------------

export default function InputLabel(theme: Theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...theme.typography.body1,
          lineHeight: 23 / 16,
        },
      },
    },
  };
}
