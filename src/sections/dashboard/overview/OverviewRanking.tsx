import { EmojiEventsRounded as TrophyIcon } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "react-query";

import { fetchWithGet } from "@/lib/request";
import type { RankingDriver } from "@/types/statistics";
import { getCurrentMonth } from "@/utils/helper";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: 24,
    height: 24,
    border: "1px solid",
    borderColor: theme.palette.grey[300],
    backgroundColor: "#FFFFFF",
    right: 0,
    top: 10,
    padding: 4,
    borderRadius: 50,
  },
}));

const StyledBadgeTop = styled(StyledBadge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 7,
    backgroundColor: theme.palette.warning.light,
    borderColor: theme.palette.warning.light,
  },
}));

export default function OverviewRanking() {
  const theme = useTheme();
  const [month, setMonth] = useState<Dayjs | null>(getCurrentMonth("dayjs"));

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "/statistics/driverOfTheMonth",
      {
        monthAndYear: dayjs(month).format("YYYY-MM-DD"),
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<RankingDriver[]>({ queryKey, signal }),
    select: (data) => data?.data.result,
  });

  return (
    <Card>
      <CardHeader title={`Top Driver In ${dayjs(month).format("MMMM")}`} />
      <Box
        sx={{
          pt: 1,
          pl: 2,
          pb: data?.length === 0 ? 25 : 1,
        }}
      >
        <DatePicker
          views={["month", "year"]}
          format={"MM/YYYY"}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          label={"Select month"}
          defaultValue={month}
          onChange={(value) => setMonth(value)}
        />
      </Box>
      {data?.length !== 0 && (
        <Stack
          direction={"column"}
          spacing={{ xs: 2, lg: 3 }}
          justifyContent={"center"}
          height={"100%"}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            sx={{
              p: 3,
              pb: 1,
            }}
          >
            <Stack
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              alignSelf={"flex-end"}
            >
              <StyledBadge badgeContent={"#2"} color={"default"}>
                {isLoading || isFetching ? (
                  <Skeleton variant={"circular"} width={48} height={48} />
                ) : (
                  <Avatar
                    src={data?.[1].avatarUrl}
                    alt={data?.[1].avatarUrl}
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: theme.palette.info.dark,
                      color: "secondary.lighter",
                      ...theme.typography.subtitle1,
                    }}
                  />
                )}
              </StyledBadge>
              <Stack direction={"column"} spacing={0.5} alignItems={"center"}>
                {isLoading || isFetching ? (
                  <Skeleton variant={"text"} sx={{ fontSize: "1rem" }} />
                ) : (
                  <>
                    <Typography variant={"subtitle2"}>
                      {data?.[1].driverName}
                    </Typography>
                    <Typography variant={"subtitle1"} color={"info.dark"}>
                      {data?.[1].totalOrderDeliverySuccess}
                    </Typography>
                  </>
                )}
              </Stack>
            </Stack>
            <Stack
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              alignSelf={"flex-start"}
            >
              <StyledBadgeTop
                badgeContent={
                  <TrophyIcon
                    sx={{
                      color: theme.palette.warning.dark,
                      width: 16,
                      height: 16,
                    }}
                  />
                }
                color={"warning"}
              >
                {isLoading || isFetching ? (
                  <Skeleton variant={"circular"} width={48} height={48} />
                ) : (
                  <Avatar
                    src={data?.[0].avatarUrl}
                    alt={data?.[0].avatarUrl}
                    sx={{
                      width: 64,
                      height: 64,
                      border: "3px solid",
                      borderColor: theme.palette.warning.main,
                      backgroundColor: theme.palette.info.dark,
                      color: "secondary.lighter",
                      ...theme.typography.subtitle1,
                    }}
                  />
                )}
              </StyledBadgeTop>
              <Stack direction={"column"} spacing={0.5} alignItems={"center"}>
                {isLoading || isFetching ? (
                  <Skeleton variant={"text"} sx={{ fontSize: "1rem" }} />
                ) : (
                  <>
                    <Typography variant={"subtitle1"}>
                      {data?.[0].driverName}
                    </Typography>
                    <Typography variant={"h6"} color={"info.dark"}>
                      {data?.[0].totalOrderDeliverySuccess}
                    </Typography>
                  </>
                )}
              </Stack>
            </Stack>
            <Stack
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              alignSelf={"flex-end"}
            >
              <StyledBadge badgeContent={"#3"} color={"default"}>
                {isLoading || isFetching ? (
                  <Skeleton variant={"circular"} width={48} height={48} />
                ) : (
                  <Avatar
                    src={data?.[2].avatarUrl}
                    alt={data?.[2].avatarUrl}
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: theme.palette.info.dark,
                      color: "secondary.lighter",
                      ...theme.typography.subtitle1,
                    }}
                  />
                )}
              </StyledBadge>
              <Stack direction={"column"} spacing={0.5} alignItems={"center"}>
                {isLoading || isFetching ? (
                  <Skeleton variant={"text"} sx={{ fontSize: "1rem" }} />
                ) : (
                  <>
                    <Typography variant={"subtitle2"}>
                      {data?.[2].driverName}
                    </Typography>
                    <Typography variant={"subtitle1"} color={"info.dark"}>
                      {data?.[2].totalOrderDeliverySuccess}
                    </Typography>
                  </>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Card>
  );
}
