import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";

import { Loading } from "@/components/loading";
import { useAuth } from "@/hooks";
import { fetchWithGet } from "@/lib/request";
import { ProfileForm } from "@/sections/dashboard/profile";
import type { AccountResponse } from "@/types";

export default function ProfilePage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { state } = useAuth();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`/account-profile/${state.id}`],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<AccountResponse>({ queryKey, signal }),
    select: (data) => {
      const defaultValues = {
        name: data?.data.result?.accountProfile?.name || "",
        birthDay: dayjs(data?.data.result?.accountProfile?.birthDay) || null,
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
            <ProfileForm disabled formRef={formRef} defaultValues={data} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
