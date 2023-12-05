import { create } from "zustand";

import type { Notification } from "@/types";

type NotificationsStore = {
  notification: Notification | null;
  addNotification: (notification: Notification) => void;
  dismissNotification: () => void;
};

export const useNotificationStore = create<NotificationsStore>((set) => ({
  notification: null,
  addNotification: (_notification) =>
    set(() => ({
      notification: { ..._notification },
    })),
  dismissNotification: () =>
    set(() => ({
      notification: null,
    })),
}));
