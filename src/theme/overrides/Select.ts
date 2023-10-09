import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Theme } from "@mui/material";

// ----------------------------------------------------------------------

export default function Select(theme: Theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreRoundedIcon,
      },

      styleOverrides: {
        select: {
          padding: theme.spacing(1, 1.75),
        },
      },
    },
  };
}
