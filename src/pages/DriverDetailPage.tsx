import { Avatar, Card, Container, Divider, Grid, Stack } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { Loading } from "@/components/loading";
import { Status } from "@/components/status";
import { Typography } from "@/components/typography";
import { fetchWithGet } from "@/lib/request";
import DriverImageList from "@/sections/dashboard/drivers/DriverImageList";
import type { DriverProfile, DriverResponse } from "@/types";
import { fDate } from "@/utils/formatTime";

export default function DriverDetailPage() {
  const params = useParams();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`/account-profile/drivers/${params.id}`],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<DriverResponse>({ queryKey, signal }),
    select: (data) => {
      return data?.data.result;
    },
  });

  const imgList: Pick<
    DriverProfile,
    | "identificationCardFrontUrl"
    | "identificationCardBackUrl"
    | "drivingLicenseFrontUrl"
    | "drivingLicenseBackUrl"
    | "vehicleRegistrationCertificateFrontUrl"
    | "vehicleRegistrationCertificateBackUrl"
  > = {
    identificationCardFrontUrl: data?.driverProfile?.identificationCardFrontUrl,
    identificationCardBackUrl: data?.driverProfile?.identificationCardBackUrl,
    drivingLicenseFrontUrl: data?.driverProfile?.drivingLicenseFrontUrl,
    drivingLicenseBackUrl: data?.driverProfile?.drivingLicenseBackUrl,
    vehicleRegistrationCertificateFrontUrl:
      data?.driverProfile?.vehicleRegistrationCertificateFrontUrl,
    vehicleRegistrationCertificateBackUrl:
      data?.driverProfile?.vehicleRegistrationCertificateBackUrl,
  };

  if (isLoading || isFetching) return <Loading />;
  return (
    <>
      <Helmet>
        <title>Driver - {params.id}</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Driver - {params.id}
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card
              sx={{
                px: 2,
                pt: 8,
                py: 4,
                height: "100%",
              }}
            >
              <Stack spacing={2}>
                <Stack alignItems={"center"}>
                  <Stack alignItems={"center"} spacing={2}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://joesch.moe/api/v1/random"
                      sx={{ width: 144, height: 144 }}
                    />
                    <Stack alignItems={"center"} spacing={0.5}>
                      <Typography variant={"subtitle1"}>
                        {data?.driverProfile?.name ?? "N/A"}
                      </Typography>
                      <Typography variant={"body1"} color={"grey.600"}>
                        @{data?.username ?? "N/A"}
                      </Typography>
                      <Typography variant={"body1"} color={"grey.600"}>
                        {data?.phoneNumber ?? "N/A"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Divider />
                <Stack spacing={1}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant={"subtitle2"}>Status:</Typography>
                    {data?.status || data?.status === 0 ? (
                      <Status
                        status={data.status}
                        sx={{
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant={"subtitle2"}>Email:</Typography>
                    <Typography
                      variant={"body2"}
                      sx={{
                        width: 230,
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data?.email ?? "N/A"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant={"subtitle2"}>Birthday:</Typography>
                    <Typography variant={"body2"}>
                      {fDate(data?.driverProfile?.birthDay)}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant={"subtitle2"}>Province:</Typography>
                    <Typography
                      variant={"body1"}
                      sx={{
                        width: 230,
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data?.driverProfile?.province ?? "N/A"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant={"subtitle2"}>District:</Typography>
                    <Typography
                      variant={"body1"}
                      sx={{
                        width: 230,
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data?.driverProfile?.district ?? "N/A"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant={"subtitle2"}>Ward:</Typography>
                    <Typography
                      variant={"body1"}
                      sx={{
                        width: 230,
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data?.driverProfile?.ward ?? "N/A"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant={"subtitle2"}>Address:</Typography>
                    <Typography
                      variant={"body1"}
                      sx={{
                        width: 230,
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data?.driverProfile?.ward ?? "N/A"}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card
              sx={{
                px: 2,
                pt: 8,
                py: 4,
                height: "100%",
              }}
            >
              <DriverImageList imgList={imgList} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
