import { Typography } from "@mui/material";

import type { Notification } from "@/types";
import { NOTIFICATION_ENUM } from "@/utils/constants";

export default function renderContent(notification: Notification | null) {
  const title = notification ? (
    <Typography variant="subtitle2">
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        {notification.content}
      </Typography>
    </Typography>
  ) : null;

  if (
    notification &&
    notification.notificationType ===
      NOTIFICATION_ENUM.DELIVERY_ORDER_SUCCESSFUL
  ) {
    return {
      avatar: (
        <img
          alt={notification.content}
          src="/assets/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (
    notification &&
    notification.notificationType === NOTIFICATION_ENUM.ASSIGNED_ORDER
  ) {
    return {
      avatar: (
        <img
          alt={notification.content}
          src="/assets/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (
    notification &&
    notification.notificationType === NOTIFICATION_ENUM.NEW_DRIVER_REGISTRATION
  ) {
    return {
      avatar: (
        <img
          alt={notification.content}
          src="/assets/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }

  return {
    avatar: null,
    title,
  };
}
