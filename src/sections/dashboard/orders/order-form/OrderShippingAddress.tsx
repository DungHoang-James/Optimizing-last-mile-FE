import {
  CircularProgress,
  InputLabel,
  Autocomplete as MuiAutocomplete,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";

import { GOONG_API_KEY, GOONG_API_URL } from "@/config";
import { useDebounce } from "@/hooks";
import { fetchWithGet } from "@/lib/request";
import type { GoongPredictionResponse, Prediction } from "@/types";

import type { OrderFormValue } from "./OrderForm";

type Props = {
  disabled: boolean;
};

export default function OrderShippingAddress({ disabled }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<OrderFormValue>();

  const searchDebounce = useDebounce(
    getValues("shippingAddress.description"),
    800
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      `/Place/Autocomplete`,
      {
        api_key: GOONG_API_KEY,
        input: searchDebounce,
        more_compound: true,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<GoongPredictionResponse, string>({
        queryKey,
        signal,
        baseURL: GOONG_API_URL,
      }),
    select: (data) =>
      data?.data.predictions.map((prediction) => ({
        description: prediction.description,
        compound: {
          commune: prediction.compound.commune,
          district: prediction.compound.district,
          province: prediction.compound.province,
        },
        place_id: prediction.place_id,
      })),
    enabled: open && !!searchDebounce,
  });

  const handleChangeInput = (value: string) => {
    setValue("shippingAddress.description", value);
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <MuiAutocomplete
        disabled={disabled}
        key={"goong-map-autocomplete"}
        onOpen={handleToggle}
        onClose={handleToggle}
        options={data || []}
        filterOptions={(x) => x}
        isOptionEqualToValue={(option, value) => {
          if (
            Object.keys(option).length === 0 ||
            Object.keys(value).length === 0
          )
            return false;
          return option.description === value.description;
        }}
        getOptionLabel={(option: Prediction) => {
          if (option?.description) return option.description;
          return "";
        }}
        id={"goong-map-autocomplete"}
        renderInput={(params) => (
          <Stack spacing={1}>
            <InputLabel required>Shipping Address</InputLabel>
            <TextField
              {...params}
              placeholder="Enter Shipping Address"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading || isFetching ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              fullWidth
              error={Boolean(errors.shippingAddress)}
              helperText={
                Boolean(errors.shippingAddress) &&
                (errors.shippingAddress?.message as string)
              }
            />
          </Stack>
        )}
        value={getValues("shippingAddress")}
        onChange={(_, value: Prediction | null) => {
          if (!value) return;

          setValue("shippingAddress", {
            compound: {
              commune: value.compound.commune,
              district: value.compound.district,
              province: value.compound.province,
            },
            description: value.description,
            place_id: value.place_id,
          });
        }}
        onInputChange={(_, value) => handleChangeInput(value)}
        fullWidth
      />
    </>
  );
}
