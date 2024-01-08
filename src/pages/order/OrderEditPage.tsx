import { Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { Loading } from "@/components/loading";
import { fetchWithGet } from "@/lib/request";
import { OrderForm } from "@/sections/dashboard/orders";
import OrderDetailsTitle from "@/sections/dashboard/orders/orders-table/OrderDetailsTitle";
import type { OrderDetailResponse } from "@/types";

export default function OrderEditPage() {
  const params = useParams();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`/orders/${params.id}`],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<OrderDetailResponse>({ queryKey, signal }),
    enabled: !!params.id,
    select: (data) => {
      if (data && data.data.result) {
        return {
          ownerId: {
            id: data.data.result?.owner.id,
            name: data.data.result?.owner.name,
          },
          driverId: {
            id: data.data.result.driver?.id,
            name: data.data.result.driver?.name,
          },
          recipientName: data?.data.result?.recipientName,
          recipientPhoneNumber: data?.data.result?.recipientPhoneNumber,
          shippingAddress: {
            compound: {
              commune: data?.data.result?.shippingWard,
              district: data?.data.result?.shippingDistrict,
              province: data?.data.result?.shippingProvince,
            },
            description: data?.data.result?.shippingAddress,
          },
          lat: data?.data.result?.lat,
          lng: data?.data.result?.lng,
          expectedShippingDate: data?.data.result?.expectedShippingDate,
          senderName: data?.data.result?.senderName,
          senderPhoneNumber: data?.data.result?.senderPhoneNumber,
          note: data?.data.result?.note,
        };
      }
    },
  });

  if (!params.id || !data || isLoading || isFetching) return <Loading />;
  return (
    <>
      <Helmet>
        <title>Order - {params.id}</title>
      </Helmet>
      <Container>
        <OrderDetailsTitle />
        <OrderForm id={params.id} status={"update"} defaultValues={data} />
      </Container>
    </>
  );
}
