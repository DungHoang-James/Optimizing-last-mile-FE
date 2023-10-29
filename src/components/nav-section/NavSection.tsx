import type { SxProps } from "@mui/material";
import { Box, List, ListItemText } from "@mui/material";
import React from "react";
import { NavLink as RouterLink } from "react-router-dom";

import { StyledNavItem, StyledNavItemIcon } from "./styles";

// ----------------------------------------------------------------------

type NavSectionProps = {
  data: any[];
  sx?: SxProps;
};

export default function NavSection({ data = [], sx }: NavSectionProps) {
  return (
    <Box sx={sx}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

type Item = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: string;
};

type NavItemProps = {
  item: Item;
};

export function NavItem({ item }: NavItemProps) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
