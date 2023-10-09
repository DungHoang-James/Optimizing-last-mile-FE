import { Theme } from "@mui/material";

// ----------------------------------------------------------------------

export default function DataGrid(theme: Theme) {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          "& .MuiDataGrid-columnsContainer": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            borderRadius: theme.shape.borderRadius,
          },
          "& .MuiDataGrid-columnHeader": {
            borderRadius: theme.shape.borderRadius,
          },
        },
        columnHeaders: {
          borderBottom: "none",
        },
      },
    },
  };
}
