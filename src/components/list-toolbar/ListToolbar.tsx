import {
  Autocomplete,
  Button,
  Chip,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";

import Iconify from "@/components/iconify";
import { ORDER_STATUS_ENUM } from "@/utils/constants";

import Form from "../form";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

type Props = {
  handleFilters: (filter: FilterFormValue) => void;
};

type Options = {
  id: ORDER_STATUS_ENUM;
  label: string;
};

export type FilterFormValue = {
  SearchName: string | null;
  StartDate: string | null;
  EndDate: string | null;
  Status: Options[] | [] | null;
};

const options: Options[] = [
  { id: ORDER_STATUS_ENUM.CREATED, label: "Created" },
  { id: ORDER_STATUS_ENUM.PROCESSING, label: "Processing" },
  { id: ORDER_STATUS_ENUM.PICK_OFF, label: "Pick off" },
  { id: ORDER_STATUS_ENUM.SHIPPING, label: "Shipping" },
  { id: ORDER_STATUS_ENUM.DELIVERED, label: "Delivered" },
  { id: ORDER_STATUS_ENUM.DELIVERY_FAILED, label: "Delivery failed" },
  { id: ORDER_STATUS_ENUM.DELETED, label: "Deleted" },
];

export default function ListToolbar({ handleFilters }: Props) {
  const { control, handleSubmit } = useForm<FilterFormValue>({
    defaultValues: {
      SearchName: undefined,
      StartDate: null,
      EndDate: null,
      Status: null,
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const onSubmit = (data: FilterFormValue) => {
    handleFilters(data);
  };

  return (
    <StyledRoot>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction={"row"} alignItems={"flex-end"}>
          <Stack spacing={1}>
            <InputLabel>Search:</InputLabel>
            <Controller
              name={"SearchName"}
              control={control}
              render={({ field }) => (
                <StyledSearch
                  {...field}
                  size={"small"}
                  placeholder="Search name..."
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify
                        icon="eva:search-fill"
                        sx={{ color: "text.disabled", width: 20, height: 20 }}
                      />
                    </InputAdornment>
                  }
                />
              )}
            />
          </Stack>
          <Stack spacing={1}>
            <InputLabel>Start Date:</InputLabel>
            <Controller
              name={"StartDate"}
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format={"DD/MM/YYYY"}
                  onChange={(date) => {
                    field.onChange(dayjs(date).format("YYYY-MM-DD"));
                  }}
                  slotProps={{ textField: { size: "small" } }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1}>
            <InputLabel>End Date:</InputLabel>
            <Controller
              name={"EndDate"}
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format={"DD/MM/YYYY"}
                  onChange={(date) => {
                    field.onChange(dayjs(date).format("YYYY-MM-DD"));
                  }}
                  slotProps={{ textField: { size: "small" } }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} width={250}>
            <InputLabel>Status:</InputLabel>
            <Controller
              name={"Status"}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  limitTags={2}
                  renderTags={(value, getTagProps) => {
                    const numTags = value.length;
                    const limitTags = 1;

                    return (
                      <>
                        {value.slice(0, limitTags).map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            size={"small"}
                            key={index}
                            label={option.label}
                          />
                        ))}

                        {numTags > limitTags && ` +${numTags - limitTags}`}
                      </>
                    );
                  }}
                  fullWidth
                  multiple
                  size={"small"}
                  id="order-status"
                  placeholder="Status"
                  options={options}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...field}
                      {...params}
                      label="Status"
                      fullWidth
                    />
                  )}
                />
              )}
            />
          </Stack>
          <Button
            type={"submit"}
            variant={"outlined"}
            sx={{
              height: 40,
            }}
          >
            Search
          </Button>
        </Stack>
      </Form>
    </StyledRoot>
  );
}

export const ListToolbarMemo = memo(ListToolbar);
