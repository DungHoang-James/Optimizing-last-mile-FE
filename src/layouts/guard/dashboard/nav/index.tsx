import { Box, Drawer, Link, List, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import { Avatar } from "@/components/avatar";
import NavSection, { NavItem } from "@/components/nav-section";
import { useAuth } from "@/hooks";
import useResponsive from "@/hooks/useResponsive";
import { fetchWithGet } from "@/lib/request";
import { Types } from "@/providers/Auth/AuthContext";
import type { AccountResponse } from "@/types";

import { logoutNav, managerNavConfig, navConfig } from "./config";

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

type Props = {
  openNav: boolean;
  onCloseNav: () => void;
};

export default function Nav({ openNav, onCloseNav }: Props) {
  const { pathname } = useLocation();
  const { state, dispatch } = useAuth();

  const { data } = useQuery({
    queryKey: [`/account-profile/${state.id}`],
    queryFn: ({ queryKey }) => fetchWithGet<AccountResponse>({ queryKey }),
    select: (data) => {
      return {
        displayName: data?.data.result?.username,
        role: state.role,
      };
    },
  });

  const isDesktop = useResponsive("up", "lg");

  const handleLogout = () => {
    return dispatch({
      type: Types.LOGOUT,
    });
  };

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <>
      <Box sx={{ mb: 5, mx: 2.5, pt: 3 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={"https://joesch.moe/api/v1/random"} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {data?.displayName || ""}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {data?.role || ""}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      <NavSection
        sx={{ flexGrow: 1 }}
        data={state.role === "ADMIN" ? navConfig : managerNavConfig}
      />
      <Box onClick={handleLogout}>
        <List disablePadding sx={{ p: 1 }}>
          <NavItem item={logoutNav} />
        </List>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
