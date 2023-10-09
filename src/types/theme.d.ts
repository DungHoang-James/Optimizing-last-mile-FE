import { ShapeOptions as MuiShapeOptions, ThemeOptions } from "@mui/material";

import { TCustomShadows } from "./shadow";

declare module "@mui/material" {
  interface Theme extends ThemeOptions {
    customShadows: TCustomShadows;
    shape: ShapeOptions;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface TypeBackground extends TypeBackground {
    neutral: string;
  }
  interface Color {
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }
  interface ShapeOptions extends MuiShapeOptions {
    borderRadius: number;
    borderRadiusSm: number;
    borderRadiusMd: number;
  }
}
declare module "@mui/material/styles" {
  interface ThemeOptions {
    layout: {
      contentWidth: number;
    };
    customShadows: TCustomShadows;
    overrides: {
      MuiButton: {
        containedSecondary: {
          color: string;
        };
      };
    };
  }
}
