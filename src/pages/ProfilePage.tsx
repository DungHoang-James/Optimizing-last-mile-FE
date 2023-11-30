import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { Loading } from "@/components/loading";
import { useAuth } from "@/hooks";
import { fetchWithGet } from "@/lib/request";
import { updateProfileMutation } from "@/mutations/profile";
import { ProfileForm } from "@/sections/dashboard/profile";
import type { ProfileFormValue } from "@/sections/dashboard/profile/ProfileForm";
import type { AccountResponse } from "@/types";

export default function ProfilePage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { state } = useAuth();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`/account-profile/${state.id}`],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<AccountResponse>({ queryKey, signal }),
    select: (data) => {
      const defaultValues = {
        name: data?.data.result?.accountProfile?.name || "",
        birthDay: data?.data.result?.accountProfile.birthDay as any,
        province: data?.data.result?.accountProfile?.province || "",
        district: data?.data.result?.accountProfile?.district || "",
        ward: data?.data.result?.accountProfile?.ward || "",
        address: data?.data.result?.accountProfile?.address || "",
        phoneContact: data?.data.result?.accountProfile?.phoneContact || "",
      };

      return defaultValues;
    },
    enabled: !!state.id,
  });

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  const handleReset = () => {
    formRef.current?.reset();
  };

  const { mutate, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: (data: ProfileFormValue) =>
      updateProfileMutation(data, state.id as string),
  });

  const onSubmit = (data: ProfileFormValue) => {
    mutate(data);
  };

  if (!data || isLoading || isFetching) return <Loading />;
  return (
    <>
      <Helmet>Profile</Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>
        <Card>
          <CardContent>
            <ProfileForm
              disabled={!data || isLoading || isFetching}
              formRef={formRef}
              defaultValues={data}
              onSubmit={onSubmit}
            />
          </CardContent>
        </Card>
        <Stack mt={3} direction={"row"} spacing={1} justifyContent={"flex-end"}>
          <LoadingButton
            size={"medium"}
            variant={"outlined"}
            color={"error"}
            onClick={handleReset}
            disabled={isLoadingUpdate}
          >
            Reset
          </LoadingButton>
          <LoadingButton
            size={"medium"}
            variant={"contained"}
            onClick={handleSubmit}
            loading={isLoadingUpdate}
          >
            Submit
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
}
