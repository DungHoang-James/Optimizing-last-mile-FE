import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

import Iconify from "@/components/iconify";
import { useNotification } from "@/hooks/useNotification";
import { queryClient } from "@/lib/react-query";
import { fetchWithGet } from "@/lib/request";
import { updateNotificationMutation } from "@/mutations/notification";
import type { Notification, Pagination } from "@/types";
import { fToNow } from "@/utils/formatTime";

import renderContent from "./renderContent";

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  useNotification(true);

  const { data } = useQuery({
    queryKey: [
      "/notifications",
      {
        page: 1,
        limit: 10,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<Pagination<Notification>>({ queryKey, signal }),
    select: (data) => data?.data.result,
  });

  const totalUnRead = data?.data?.filter((item) => !item.isRead).length;

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  //   const handleMarkAllAsRead = () => {
  //     setNotifications(
  //       notifications.map((notification) => ({
  //         ...notification,
  //         isUnRead: false,
  //       }))
  //     );
  //   };

  return (
    <>
      <IconButton
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              ml: 0.75,
              width: 360,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have{" "}
              {totalUnRead && totalUnRead >= 10
                ? `more than ${totalUnRead}`
                : totalUnRead}{" "}
              unread messages
            </Typography>
          </Box>

          {/* {totalUnRead && totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <List
          disablePadding
          sx={{
            overflow: "auto",
            height: 600,
          }}
        >
          {data?.data?.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </List>

        <Divider sx={{ borderStyle: "dashed" }} />

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box> */}
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

type NotificationItemProps = {
  notification: Notification;
};

function NotificationItem({ notification }: NotificationItemProps) {
  const { avatar, title } = renderContent(notification);
  const { mutate } = useMutation(updateNotificationMutation, {
    onSuccess: () => {
      queryClient.refetchQueries(["/notifications", { page: 1, limit: 10 }]);
    },
  });

  const handleReadNotification = (id: string) => {
    if (notification.isRead) return;
    mutate(id);
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(!notification.isRead && {
          bgcolor: "action.selected",
        }),
      }}
      onClick={() => handleReadNotification(notification.id)}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
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
            {fToNow(notification.createdDate)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
