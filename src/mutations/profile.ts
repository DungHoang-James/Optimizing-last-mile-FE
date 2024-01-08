import type { AxiosResponse } from "axios";

import { request } from "@/lib/request";
import type { ChangePasswordFormSchema } from "@/sections/dashboard/manager-profile/ManagerProfileChangePasswordForm";
import type { ProfileFormValue } from "@/sections/dashboard/profile/ProfileForm";
import type { AccountResponse, Response } from "@/types";

export const updateProfileMutation = async (
  data: ProfileFormValue,
  id: string
): Promise<AxiosResponse<Response<AccountResponse>, any> | undefined> => {
  return request({
    url: `/account-profile/${id}`,
    method: "PUT",
    data,
  });
};

export const updateManagerPassword = async (
  data: ChangePasswordFormSchema,
  email: string
): Promise<AxiosResponse<Response<any>, any> | undefined> => {
  return request({
    url: `/auth/email/password`,
    method: "PUT",
    data: { ...data, email },
  });
};
