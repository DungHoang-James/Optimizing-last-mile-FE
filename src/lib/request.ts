import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

import type { Response } from "@/types";
import { removeNullUndefined } from "@/utils/helper";

import { axios } from "./axios";

export const request = async (config: AxiosRequestConfig) => {
  try {
    const res = await axios.request(config);
    return res;
  } catch (error) {
    const res = error as AxiosError<any>;
    console.log(res);
  }
};

export const fetchWithGet = <
  T,
  TBaseURL extends string | undefined = undefined,
>({
  queryKey,
  signal,
  baseURL,
}: {
  queryKey: any;
  signal?: AbortSignal;
  baseURL?: TBaseURL;
}): Promise<
  AxiosResponse<TBaseURL extends string ? T : Response<T>, any> | undefined
> => {
  return request({
    method: "GET",
    params: removeNullUndefined(queryKey[1]),
    url: queryKey[0],
    signal,
    baseURL,
  });
};

export const fetchWithOptionMethod = <TData = unknown>(
  url: string,
  data: TData,
  method: Exclude<Method, "GET">
) => {
  return request({
    method,
    data,
    url,
  });
};
