import type { AxiosResponse } from "axios";

import { request } from "@/lib/request";
import type { LoginPayload, LoginResponse, Response } from "@/types";

export const loginMutation = async (
  data: LoginPayload
): Promise<AxiosResponse<Response<LoginResponse>, any> | undefined> => {
  return request({
    url: "/auth/login/username",
    method: "POST",
    data,
  });
};
