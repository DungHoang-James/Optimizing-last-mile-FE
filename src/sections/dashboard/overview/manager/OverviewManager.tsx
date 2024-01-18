import { Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";

import { DateRangePicker } from "@/components/date-range-picker";
import type { DateRangePickerForm } from "@/components/date-range-picker/DateRangePicker";
import { useAuth } from "@/hooks";
import { fetchWithGet } from "@/lib/request";
import type { ChartData, StatisticOrder } from "@/types/statistics";
import { fDate } from "@/utils/formatTime";
import { getCurrentMonth, getPreviousMonth } from "@/utils/helper";

import { OverviewRanking, OverviewStatistic } from "..";

type RangeDate = {
  startTime: string;
  endTime: string;
};

export default function OverviewRankingManager() {
  const {
    state: { id },
  } = useAuth();
  const [rangeDate, setRangeDate] = useState<RangeDate>({
    startTime: getPreviousMonth("dayjs").format("YYYY-MM-DD"),
    endTime: getCurrentMonth("dayjs").format("YYYY-MM-DD"),
  });
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      `/statistics/managers/${id}/orders`,
      {
        startTime: rangeDate?.startTime,
        endTime: rangeDate?.endTime,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<StatisticOrder[]>({ queryKey, signal }),
    select: (data): ChartData => {
      const labels: string[] = [];
      const numberOfOrderDeleted: number[] = [];
      const numberOfOrderDeliveryFailed: number[] = [];
      const numberOfOrderDeliverySuccess: number[] = [];
      const numberOfOrderProcessing: number[] = [];

      return data?.data.result?.reduce((_, curr) => {
        labels.push(`${curr.month}/${curr.year}`);

        if (curr.numberOfOrderDeleted === 0 || curr.numberOfOrderDeleted) {
          numberOfOrderDeleted.push(curr.numberOfOrderDeleted);
        }
        if (
          curr.numberOfOrderDeliveryFailed === 0 ||
          curr.numberOfOrderDeliveryFailed
        ) {
          numberOfOrderDeliveryFailed.push(curr.numberOfOrderDeliveryFailed);
        }
        if (
          curr.numberOfOrderDeliverySuccess === 0 ||
          curr.numberOfOrderDeliverySuccess
        ) {
          numberOfOrderDeliverySuccess.push(curr.numberOfOrderDeliverySuccess);
        }
        if (
          curr.numberOfOrderProcessing === 0 ||
          curr.numberOfOrderProcessing
        ) {
          numberOfOrderProcessing.push(curr.numberOfOrderProcessing);
        }

        return {
          labels,
          numberOfOrderDeleted,
          numberOfOrderDeliveryFailed,
          numberOfOrderDeliverySuccess,
          numberOfOrderProcessing,
        };
      }, {});
    },
  });

  const onSubmit = useCallback((data: DateRangePickerForm) => {
    setRangeDate({
      startTime: fDate(data.from.toString(), "YYYY-MM-DD"),
      endTime: fDate(data.to && data.to.toString(), "YYYY-MM-DD"),
    });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <OverviewStatistic
          title="Order Statistics"
          subheader=""
          renderFilter={() => <DateRangePicker onSubmit={onSubmit} />}
          isLoading={isLoading || isFetching}
          chart={{
            labels: data?.labels,
            series: [
              {
                name: "Order Deleted",
                data: data?.numberOfOrderDeleted,
              },
              {
                name: "Order Devlivery Failed",
                data: data?.numberOfOrderDeliveryFailed,
              },
              {
                name: "Order Devlivery Success",
                data: data?.numberOfOrderDeliverySuccess,
              },
              {
                name: "Order Processing",
                data: data?.numberOfOrderProcessing,
              },
            ],
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <OverviewRanking />
      </Grid>
    </Grid>
  );
}
