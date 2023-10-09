import { Theme } from "@mui/material";

// ----------------------------------------------------------------------

export default function Breadcrumbs(theme: Theme) {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: theme.spacing(0.75),
          marginRight: theme.spacing(0.75),
        },
      },
    },
  };
}
