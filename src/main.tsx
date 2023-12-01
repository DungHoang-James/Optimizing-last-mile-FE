import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import "@fontsource/public-sans/300.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const connection = new HubConnectionBuilder()
//   .withUrl("http://13.213.31.188/notificationconnect", {
//     transport: HttpTransportType.WebSockets,
//     skipNegotiation: true,
//     accessTokenFactory() {
//       return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiI5IiwianRpIjoiMTFkYjBjOGYtZTk2ZC00Mzg0LTljN2QtM2Q0YjYxYmI0YWVlIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiTUFOQUdFUiIsIkF1dGhSb2xlIjoiTUFOQUdFUiIsImV4cCI6MTcwMzgyMDAzMX0.KI_zvMswaGQ0L1w9LALYyynu1x2lTGnr1PEc9c0ovm4";
//     },
//   })
//   .build();

// connection.on("receiveNoti", (noti) => {
//   // xử lý khi nhận được notification
//   console.log(noti);
// });

// connection.start().catch((err) => console.error(err));
