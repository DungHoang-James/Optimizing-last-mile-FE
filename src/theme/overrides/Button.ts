import type { Theme } from "@mui/material";

// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          fontWeight: theme.typography.fontWeightMedium,
          textTransform: "initial",
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          height: 48,
          padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          "&:hover": {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        containedInfo: {
          boxShadow: theme.customShadows.info,
        },
        containedSuccess: {
          boxShadow: theme.customShadows.success,
        },
        containedWarning: {
          boxShadow: theme.customShadows.warning,
        },
        containedError: {
          boxShadow: theme.customShadows.error,
        },
        outlined: {
          "&:hover": {
            opacity: 0.88,
          },
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        text: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textPrimary: {
          "&:hover": {
            color: theme.palette.primary.dark,
          },
        },
        textSecondary: {
          "&:hover": {
            color: theme.palette.secondary.dark,
          },
        },
      },
    },
  };
}
