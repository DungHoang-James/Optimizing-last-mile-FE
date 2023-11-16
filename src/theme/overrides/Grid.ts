import type { Components } from "@mui/material";

export default function DataGrid(): Components {
  return {
    MuiGrid: {
      styleOverrides: {
        root: {
          width: "100%",
        },
        "grid-xs-6": {
          ":nth-of-type(1)": {
            paddingTop: 0,
          },
          ":nth-of-type(2)": {
            paddingTop: 0,
          },
        },
        item: {
          ":first-of-type": {
            paddingLeft: 0,
          },
        },
      },
    },
  };
}
