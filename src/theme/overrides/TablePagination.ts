import { Theme } from "@mui/material";

// ----------------------------------------------------------------------

export default function TablePagination(theme: Theme) {
  return {
    MuiTablePagination: {
      styleOverrides: {
        select: {
          borderRadius: theme.shape.borderRadius,
          "&:focus": {
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}
