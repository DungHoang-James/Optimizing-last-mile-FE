import { Box, SxProps } from "@mui/material";
import { FC, PropsWithChildren, memo } from "react";

import { StyledRootScrollbar, StyledScrollbar } from "./styles";

type Props = {
  sx?: SxProps;
} & PropsWithChildren;

const Scrollbar: FC<Props> = memo(({ children, sx, ...other }) => {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});

Scrollbar.displayName = "Scrollbar";

export default Scrollbar;
