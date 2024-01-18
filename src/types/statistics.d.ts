export type RankingDriver = {
  driverId: number;
  driverName: string;
  avatarUrl: string;
  totalOrderDeliverySuccess: number;
};

export type StatisticOrder = {
  month: number;
  monthName: string;
  numberOfOrderDeleted: number;
  numberOfOrderDeliveryFailed: number;
  numberOfOrderDeliverySuccess: number;
  numberOfOrderProcessing: number;
  totalOrder: number;
  year: number;
};

export type StatisticManager = StatisticOrder;

type ChartData =
  | {
      labels: any;
      numberOfOrderDeleted: any;
      numberOfOrderDeliveryFailed: any;
      numberOfOrderDeliverySuccess: any;
      numberOfOrderProcessing: any;
    }
  | undefined
  | Record<string, never>;
