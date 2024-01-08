import {
  HighlightOffRounded as FailedIcon,
  CheckCircleRounded as SuccessIcon,
} from "@mui/icons-material";
import { CircularProgress, TableCell, TableRow } from "@mui/material";
import { useSnackbar } from "notistack";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { useQuery } from "react-query";

import { GOONG_API_KEY, GOONG_API_URL } from "@/config";
import { fetchWithGet } from "@/lib/request";
import { useRecordStore } from "@/stores/records";
import type {
  GoongPlaceDetailResponse,
  GoongPredictionResponse,
} from "@/types";
import { sleep } from "@/utils/helper";

type Props = {
  shippingAddress: string;
  index: number;
  enrichIndex: number;
  handleEnrich: (rowNo: number) => void;
};

export default function OrderUploadFileTableRow({
  index,
  enrichIndex,
  shippingAddress,
  handleEnrich,
  children,
}: PropsWithChildren<Props>) {
  const [placeId, setPlaceId] = useState<string | null>();
  const { enqueueSnackbar } = useSnackbar();
  const { loadingBatch, errorRecords, enrichGeometry, enrichAddress } =
    useRecordStore();

  const { status } = useQuery({
    queryKey: [
      `/Place/Autocomplete`,
      {
        input: shippingAddress,
        more_compound: true,
        api_key: GOONG_API_KEY,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<GoongPredictionResponse, string>({
        queryKey,
        signal,
        baseURL: GOONG_API_URL,
      }),
    select: (data) => ({
      placeId: data?.data.predictions[0].place_id,
      shippingProvince: data?.data.predictions[0].compound.province,
      shippingDistrict: data?.data.predictions[0].compound.district,
      shippingWard: data?.data.predictions[0].compound.commune,
    }),
    onSuccess: (data) => {
      if (
        data &&
        data.shippingProvince &&
        data.shippingDistrict &&
        data.shippingWard
      ) {
        handleEnrichAddress(
          index,
          data.shippingProvince,
          data.shippingDistrict,
          data.shippingWard
        );
        sleep(1000).then(() => {
          setPlaceId(data.placeId);
        });
      } else {
        enqueueSnackbar({
          variant: "error",
          message: `Cannot get shipping compound detail with: ${shippingAddress}`,
        });
      }
    },
    enabled: !!shippingAddress && index === enrichIndex,
  });

  useQuery({
    queryKey: [
      "/Place/Detail",
      {
        place_id: placeId,
        api_key: GOONG_API_KEY,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<GoongPlaceDetailResponse, string>({
        queryKey,
        signal,
        baseURL: GOONG_API_URL,
      }),
    select: (data) => ({
      lat: data?.data.result?.geometry?.location?.lat,
      lng: data?.data.result?.geometry?.location?.lng,
    }),
    onSuccess: (data) => {
      if (data && data.lat && data.lng) {
        handleEnrichGeometry(index, data.lat, data.lng);
        sleep(1000).then(() => {
          handleEnrich(index + 1);
          setPlaceId(null);
        });
      } else {
        enqueueSnackbar({
          variant: "error",
          message: `Cannot get lat & lng with address: ${shippingAddress}`,
        });
      }
    },
    enabled: !!placeId && index === enrichIndex,
  });

  const handleEnrichGeometry = (index: number, lat: number, lng: number) => {
    enrichGeometry(index, lat, lng);
  };

  const handleEnrichAddress = (
    index: number,
    shippingProvince: string,
    shippingDistrict: string,
    shippingWard: string
  ) => {
    enrichAddress(index, shippingProvince, shippingDistrict, shippingWard);
  };

  return (
    <TableRow>
      {children}
      <TableCell align={"center"}>
        {loadingBatch ? (
          <CircularProgress size={25} />
        ) : status === "success" ? (
          <SuccessIcon />
        ) : (
          <FailedIcon />
        )}
      </TableCell>
      {!loadingBatch ? (
        errorRecords &&
        Array.isArray(errorRecords) &&
        errorRecords[index] &&
        !errorRecords[index].isSuccess ? (
          <TableCell align={"center"}>
            {errorRecords[index].error.errorMessage}
          </TableCell>
        ) : (
          <TableCell align={"center"}>None</TableCell>
        )
      ) : (
        <TableCell align={"center"}>
          <CircularProgress size={25} />
        </TableCell>
      )}
    </TableRow>
  );
}
