import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SnackbarContent,
  useSnackbar,
  type CustomContentProps,
} from "notistack";
import { forwardRef, useCallback } from "react";

import renderContent from "@/layouts/guard/dashboard/header/renderContent";
import { useNotificationStore } from "@/stores/notifications";
import { fToNow } from "@/utils/formatTime";

import Iconify from "../iconify";

type Props = CustomContentProps;

const Notification = forwardRef<HTMLDivElement, Props>(({ id }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const { notification } = useNotificationStore();
  const theme = useTheme();

  const { avatar } = renderContent(notification);

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <ListItemButton
        sx={{
          bgcolor: "grey.0",
          boxShadow: theme.customShadows.z24,
        }}
        onClick={() => handleDismiss()}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            notification && (
              <Typography variant="subtitle2">
                {notification.content}
              </Typography>
            )
          }
          secondary={
            notification?.createdDate && (
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  display: "flex",
                  alignItems: "center",
                  color: "text.disabled",
                }}
              >
                <Iconify
                  icon="eva:clock-outline"
                  sx={{ mr: 0.5, width: 16, height: 16 }}
                />
                {fToNow(notification?.createdDate)}
              </Typography>
            )
          }
        />
      </ListItemButton>
    </SnackbarContent>
  );
});

Notification.displayName = "Notification";

export default Notification;
