import Axios, { InternalAxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import { useNotificationStore } from "@/stores/notifications";
import storage from "@/utils/storage";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();
  config.headers.Authorization = `${token}`;

  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: "error",
      title: "Error",
      message,
    });

    return Promise.reject(error);
  }
);
