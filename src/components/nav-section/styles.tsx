import type { ListItemButtonProps } from "@mui/material";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { NavLinkProps } from "react-router-dom";

export const StyledNavItem = styled(
  (props: ListItemButtonProps & NavLinkProps) => <ListItemButton {...props} />
)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
