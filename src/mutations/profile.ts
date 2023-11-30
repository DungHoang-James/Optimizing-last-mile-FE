import type { AxiosResponse } from "axios";

import { request } from "@/lib/request";
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
