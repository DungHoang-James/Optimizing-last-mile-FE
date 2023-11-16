import type { InternalAxiosRequestConfig } from "axios";
import Axios from "axios";

import { BASE_API_URL } from "@/config";
import storage from "@/utils/storage";

export const axios = Axios.create({
  baseURL: BASE_API_URL,
});

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers.Accept = "application/json";
  config.headers["Content-Type"] = "application/json";
  config.headers["Access-Control-Allow-Origin"] = "*";

  return config;
}

axios.interceptors.request.use(authRequestInterceptor, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(message);

    // useNotificationStore.getState().addNotification({
    //   type: "error",
    //   title: "Error",
    //   message,
    // });

    return Promise.reject(error);
  }
);
