import type { AxiosResponse } from "axios";

import { request } from "@/lib/request";
import type { Response } from "@/types";

export const updateNotificationMutation = async (
  id: string
): Promise<AxiosResponse<Response<any>, any> | undefined> => {
  return request({
    url: `/notifications/${id}`,
    method: "PUT",
  });
};
