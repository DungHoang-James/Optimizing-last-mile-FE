import type { Breakpoint } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type Query = "up" | "down" | "between";

export default function useResponsive(
  query?: Query,
  start?: (Breakpoint | number) & string,
  end?: Breakpoint | number
): boolean {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start!));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start!));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start!, end!));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start!));

  if (query === "up") {
    return mediaUp;
  }

  if (query === "down") {
    return mediaDown;
  }

  if (query === "between") {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

export function useWidth() {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: Breakpoint | null, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || "xs"
  );
}
