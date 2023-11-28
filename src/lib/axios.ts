import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Axios from "axios";

import { BASE_API_URL } from "@/config";
import { Response } from "@/types";
import storage from "@/utils/storage";

import { openSnackbar } from "@/components/snackbar";

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
    const successResponse: AxiosResponse = response;

    if (
      successResponse.config.method !== "get" &&
      successResponse.config.url !== "/auth/login/username"
    ) {
      let successMessage = null;

      switch (successResponse.config.method) {
        case "post":
          successMessage = "Create successfully";
          break;
        case "put":
          successMessage = "Update successfully";
          break;
        case "delete":
          successMessage = "Delete successfully";
          break;
        default:
          successMessage = "";
          break;
      }

      openSnackbar({
        autoHideDuration: 6000,
        errorMessage: successMessage,
        severity: "success",
      });
    }

    return response;
  },
  (error) => {
    const errorReponse: AxiosError<Response<null>> = error;
    const errorMessage =
      errorReponse.response?.data?.errorMessage || errorReponse.message;

    if (errorReponse.code !== "ERR_CANCELED") {
      openSnackbar({
        autoHideDuration: 6000,
        errorMessage,
        severity: "error",
      });
    }

    // useNotificationStore.getState().addNotification({
    //   type: "error",
    //   title: "Error",
    //   message,
    // });

    return Promise.reject(error);
  }
);
