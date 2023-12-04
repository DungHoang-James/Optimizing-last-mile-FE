import {
  HighlightOffRounded as FailedIcon,
  RadioButtonUncheckedRounded as InitialIcon,
  CheckCircleRounded as SuccessIcon,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Skeleton,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";

import { useOrderDialog } from "@/hooks";
import { fetchWithGet } from "@/lib/request";
import { updateOrderDriverMutation } from "@/mutations/order";
import type { OrderDetailResponse, OrderDriverPayload } from "@/types";

type Props = {
  selectId: string;
};

export default function OrderDriverDialogTableBody({ selectId }: Props) {
  const { state } = useOrderDialog();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`/orders/${selectId}`],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<OrderDetailResponse>({ queryKey, signal }),
    select: (data) => data?.data.result,
    enabled: !!selectId,
  });

  const { mutate, status } = useMutation({
    mutationFn: (data: OrderDriverPayload) =>
      updateOrderDriverMutation(data, selectId),
  });

  useEffect(() => {
    if (state.driver.id && state.status === "submit") {
      mutate({
        driverId: state.driver.id,
        recipientName: data?.recipientName || "",
        recipientPhoneNumber: data?.recipientPhoneNumber || "",
        shippingProvince: data?.shippingProvince || "",
        shippingDistrict: data?.shippingDistrict || "",
        shippingWard: data?.shippingWard || "",
        shippingAddress: data?.shippingAddress || "",
        lat: data?.lat || 0,
        lng: data?.lng || 0,
        expectedShippingDate: data?.expectedShippingDate || "",
        senderName: data?.senderName || "",
        senderPhoneNumber: data?.senderPhoneNumber || "",
        note: data?.note || "",
      });
    }
  }, [state.status, state.driver.id]);

  if (!data || isLoading || isFetching)
    return (
      <TableRow>
        <TableCell>
          <Skeleton />.
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>
    );
  return (
    <TableRow>
      <TableCell>{data?.id}</TableCell>
      <TableCell>{data?.owner.name}</TableCell>
      <TableCell>
        {!state.driver.id || state.driver.id === data.driver?.id ? (
          data?.driver?.name
        ) : (
          <Box>{state.driver.name}</Box>
        )}
      </TableCell>
      <TableCell align={"center"}>
        {status === "idle" && <InitialIcon />}
        {status === "loading" && <CircularProgress />}
        {status === "success" && <SuccessIcon />}
        {status === "error" && <FailedIcon />}
      </TableCell>
    </TableRow>
  );
}
