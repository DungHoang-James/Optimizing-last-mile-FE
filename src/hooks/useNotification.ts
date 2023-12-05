import type { HubConnection } from "@microsoft/signalr";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { BASE_SIGNALR_URL } from "@/config";
import { queryClient } from "@/lib/react-query";
import { getSignalRConnection } from "@/signalr";
import { useNotificationStore } from "@/stores/notifications";
import type { Notification } from "@/types";

let connection: HubConnection;

export function useNotification(connect: boolean) {
  const notification = useNotificationStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!connect) {
      return;
    }

    async function subscribe() {
      connection = await getSignalRConnection(BASE_SIGNALR_URL);

      connection.on("receiveNoti", (response: Notification) => {
        queryClient.refetchQueries(["/notifications", { page: 1, limit: 10 }]);

        if (notification.notification) notification.dismissNotification();
        notification.addNotification(response);
        enqueueSnackbar(response.content, { variant: "notification" });
      });
    }

    subscribe();

    return () => {
      if (connection) {
        connection.off("receiveNoti");

        const message = "Unsubscribed from Receive Noti";
        console.log(message);
      }
    };
  }, [connect]);
}
