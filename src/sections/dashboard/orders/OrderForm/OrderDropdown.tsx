import { fetchWithGet } from "@/lib/request";
import { Min } from "@/types/min";
import {
  Autocomplete,
  CircularProgress,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";

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
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [valueAutoComplete, setValueAutoComplete] = useState<Min | null>(null);
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

  useEffect(() => {
    if (!name) return;
    const value = getValues(name) || null;

    setValueAutoComplete(value);
  }, [getValues(name)]);

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
          {option.name}
        </li>
      )}
      defaultValue={getValues(name) || undefined}
      value={valueAutoComplete}
      onChange={(_, value) => {
        setValue(name, value);
      }}
      fullWidth
    />
  );
}
