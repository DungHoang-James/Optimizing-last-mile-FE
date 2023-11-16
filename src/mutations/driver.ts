import type { AxiosResponse } from "axios";

import { request } from "@/lib/request";
import type { DriverStatusPayload, Response } from "@/types";

export const updateStatusDriverMutation = async ({
  id,
  status,
}: DriverStatusPayload): Promise<
  AxiosResponse<Response<any>, any> | undefined
> => {
  return request({
    url: `/account-profile/drivers/${id}/status`,
    method: "PUT",
    data: {
      status,
    },
  });
};
