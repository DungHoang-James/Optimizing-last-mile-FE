import type { AxiosResponse } from "axios";

import { request } from "@/lib/request";
import type {
  CreateManagerPayload,
  Response,
  UpdateManagerPayload,
} from "@/types";

export const createManagerService = async (
  payload: CreateManagerPayload
): Promise<AxiosResponse<Response<any>, any> | undefined> => {
  return request({
    url: "/managers",
    method: "POST",
    data: payload,
  });
};

export const updateManagerService = async (
  data: UpdateManagerPayload,
  id: number
): Promise<AxiosResponse<Response<any>, any> | undefined> => {
  return request({
    url: `/managers/${id}`,
    method: "PUT",
    data,
  });
};

export const deleteManagerService = async (id: number) => {
  return request({
    url: `/managers/${id}`,
    method: "DELETE",
  });
};
