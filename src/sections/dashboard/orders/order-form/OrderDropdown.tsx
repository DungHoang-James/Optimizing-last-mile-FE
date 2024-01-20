import {
  Autocomplete,
  CircularProgress,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";

import { fetchWithGet } from "@/lib/request";
import type { Min } from "@/types/min";

type Props = {
  name: string;
  placeholder: string;
  inputLabel: string;
  required?: boolean;
  role: number;
  disabled: boolean;
};

export default function OrderDropdown({
  name,
  placeholder,
  inputLabel,
  required,
  role,
  disabled,
}: Props) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [open, setOpen] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "/account-profile/min",
      {
        role,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<Min[]>({ queryKey, signal }),
    select: (data) => data?.data.result,
    enabled: !!role && open,
  });

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Autocomplete
      disabled={disabled}
      id={`combo-box-${name}`}
      onOpen={handleOpen}
      options={data ? data : []}
      isOptionEqualToValue={(option, value) => {
        if (Object.keys(option).length === 0 || Object.keys(value).length === 0)
          return false;
        return option.id === value.id;
      }}
      getOptionLabel={(option) => {
        if (option?.name) return option.name;
        return "";
      }}
      renderInput={(params) => (
        <Stack spacing={1}>
          <InputLabel required={required}>{inputLabel}</InputLabel>
          <TextField
            {...params}
            placeholder={placeholder}
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
            error={Boolean(errors[name])}
            helperText={
              Boolean(errors[name]) && (errors[name]?.message as string)
            }
          />
        </Stack>
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.id} &#8208; {option?.phoneNumberProfile ?? "N/A"} &#8208;{" "}
          {option.name}
        </li>
      )}
      value={watch(name)}
      onChange={(_, value) => {
        setValue(name, value);
      }}
      fullWidth
    />
  );
}
