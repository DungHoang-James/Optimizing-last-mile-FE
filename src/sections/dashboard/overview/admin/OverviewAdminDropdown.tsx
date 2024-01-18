import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, type Control } from "react-hook-form";
import { useQuery } from "react-query";

import { fetchWithGet } from "@/lib/request";

import type { FilterStatistics } from "./OverviewAdminFilter";

export const ROLE_MANAGER = 1;

type Props = {
  control: Control<FilterStatistics>;
};

export default function OverviewAdminDropdown({ control }: Props) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "/account-profile/min",
      {
        role: ROLE_MANAGER,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<any[]>({ queryKey, signal }),
    select: (data) => data?.data.result,
    enabled: !!ROLE_MANAGER && open,
  });

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Controller
      name={"manager"}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          size={"small"}
          id={`combo-box-${name}`}
          onOpen={handleOpen}
          options={data ? data : []}
          isOptionEqualToValue={(option, value) => {
            if (
              Object.keys(option).length === 0 ||
              Object.keys(value).length === 0
            )
              return false;
            return option.id === value.id;
          }}
          getOptionLabel={(option) => {
            if (option?.name) return option.name;
            return "";
          }}
          sx={{
            width: 250,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Select manager"}
              placeholder={"Select Manager"}
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
              helperText={
                Boolean(fieldState.error) && fieldState.error?.message
              }
              error={Boolean(fieldState.error)}
              fullWidth
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          )}
          {...field}
          onChange={(_, value) => {
            field.onChange(value);
          }}
        />
      )}
    />
  );
}
