import { useState } from "react";
import { useQuery } from "react-query";

import { fetchWithGet } from "@/lib/request";
import type { ChartData, StatisticManager } from "@/types/statistics";
import { fDate } from "@/utils/formatTime";
import { getCurrentMonth, getPreviousMonth } from "@/utils/helper";

import { OverviewStatistic } from "..";

import type { FilterStatistics } from "./OverviewAdminFilter";

import { OverviewAdminFilter } from ".";

type FormStateValue = {
  manager: { id?: number; name?: string } | null;
  startTime: string;
  endTime: string;
};

export default function OverviewAdmin() {
  const [formValue, setFormValue] = useState<FormStateValue>({
    manager: null,
    startTime: getPreviousMonth("dayjs").format("YYYY-MM-DD"),
    endTime: getCurrentMonth("dayjs").format("YYYY-MM-DD"),
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      `/statistics/managers/${formValue.manager?.id}/orders`,
      {
        startTime: "2023-12-31",
        endTime: "2024-01-31",
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<StatisticManager[]>({ queryKey, signal }),
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
    enabled: !!formValue.manager && !!formValue.manager?.id,
  });

  const onSubmit = (data: FilterStatistics) => {
    setFormValue({
      manager: data.manager,
      startTime: fDate(data.from.toString(), "YYYY-MM-DD"),
      endTime: fDate(data.to && data.to.toString(), "YYYY-MM-DD"),
    });
  };

  const series = data
    ? [
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
      ]
    : [{ name: "", data: [] }];

  return (
    <OverviewStatistic
      title="Manager Statistics"
      subheader=""
      renderFilter={() => <OverviewAdminFilter onSubmit={onSubmit} />}
      isLoading={isLoading || isFetching}
      chart={{
        labels: data?.labels,
        series,
      }}
    />
  );
}
