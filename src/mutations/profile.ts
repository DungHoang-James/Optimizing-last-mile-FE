import { request } from "@/lib/request";
import { ProfileFormValue } from "@/sections/dashboard/profile/ProfileForm";
import { AccountResponse, Response } from "@/types";
import { AxiosResponse } from "axios";

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
