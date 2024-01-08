import type { AxiosResponse } from "axios";

import { request } from "@/lib/request";
import type { LoginWithEmailForm } from "@/sections/auth/login/LoginEmailForm";
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

export const loginEmailMutation = async (
  data: LoginWithEmailForm
): Promise<AxiosResponse<Response<LoginResponse>, any> | undefined> => {
  return request({
    url: "/auth/login/emailpassword",
    method: "POST",
    data,
  });
};
