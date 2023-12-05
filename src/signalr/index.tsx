import type { HubConnection, IHttpConnectionOptions } from "@microsoft/signalr";
import {
  JsonHubProtocol,
  HubConnectionState,
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";

import storage from "@/utils/storage";

const startSignalRConnection = async (connection: HubConnection) => {
  try {
    await connection.start();
    console.assert(connection.state === HubConnectionState.Connected);
    console.log("SignalR connection established", connection.baseUrl);
  } catch (err) {
    console.assert(connection.state === HubConnectionState.Disconnected);
    console.error("SignalR Connection Error: ", err);
    setTimeout(() => startSignalRConnection(connection), 5000);
  }
};

export const getSignalRConnection = async (url: string) => {
  const options: IHttpConnectionOptions = {
    transport: HttpTransportType.WebSockets,
    skipNegotiation: true,
    accessTokenFactory: () => storage.getToken(),
  };

  console.log("SignalR: Creating new connection.");

  const connection = new HubConnectionBuilder()
    .withUrl(url, options)
    .withAutomaticReconnect()
    .withHubProtocol(new JsonHubProtocol())
    .configureLogging(LogLevel.None)
    .build();

  connection.serverTimeoutInMilliseconds = 60000;
  connection.keepAliveIntervalInMilliseconds = 15000;

  connection.onclose((error) => {
    console.assert(connection.state === HubConnectionState.Disconnected);
    if (error) {
      console.log("SignalR: connection was closed due to error.", error);
    } else {
      console.log("SignalR: connection was closed.");
    }
  });

  connection.onreconnecting((error) => {
    console.assert(connection.state === HubConnectionState.Reconnecting);
    console.log("SignalR: connection lost due. Reconnecting...", error);
  });

  connection.onreconnected((connectionId) => {
    console.assert(connection.state === HubConnectionState.Connected);
    console.log(
      "SignalR: connection reestablished. Connected with connectionId",
      connectionId
    );
  });

  await startSignalRConnection(connection);

  return connection;
};
