import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import type { ApexOptions } from "apexcharts";

import { Chart } from "@/components/chart";
import { Loading } from "@/components/loading";

type TChart = {
  labels: string[];
  colors?: any[];
  series: TSeries[];
  plotOptions?: ApexOptions["plotOptions"];
};
export type TSeries =
  | {
      name: string;
      type?: string;
      fill?: string;
      data: number[];
    }
  | { name: string; data: [] };

type Props = {
  title: string;
  subheader: string;
  chart: TChart;
  isLoading: boolean;
  renderFilter: () => JSX.Element;
};

export default function OverviewStatistic({
  title,
  subheader,
  chart,
  isLoading,
  renderFilter,
  ...other
}: Props) {
  const { labels, series } = chart;

  return (
    <Card {...other}>
      <Stack sx={{ pt: 2.5, px: 2.5 }} spacing={1.5}>
        <Box>
          <Typography variant={"subtitle1"}>{title}</Typography>
          <Typography variant={"body2"} color={"grey.600"}>
            {subheader}
          </Typography>
        </Box>
        {renderFilter()}
      </Stack>
      <Box sx={{ p: 3, pb: 1 }}>
        {isLoading ? (
          <Loading />
        ) : (
          <Chart
            dir="ltr"
            type="bar"
            series={series}
            options={{
              chart: {
                type: "bar",
                stacked: true,
                toolbar: {
                  show: false,
                },
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      position: "bottom",
                      offsetX: -10,
                      offsetY: 0,
                    },
                  },
                },
              ],
              plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 10,
                  dataLabels: {
                    total: {
                      enabled: true,
                      style: {
                        fontSize: "13px",
                        fontWeight: 900,
                      },
                    },
                  },
                },
              },
              xaxis: {
                type: "category",
                categories: labels,
              },
              legend: {
                position: "right",
                offsetY: 40,
              },
              fill: {
                opacity: 1,
              },
              noData: {
                text: "No data text",
                align: "center",
                verticalAlign: "middle",
              },
            }}
            width="100%"
            height={364}
          />
        )}
      </Box>
    </Card>
  );
}
