import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Controller, useForm } from "react-hook-form";
import type { InferType } from "yup";
import { boolean, date, object } from "yup";

import Form from "@/components/form";
import { getCurrentMonth, getPreviousMonth } from "@/utils/helper";

export type DateRangePickerForm = InferType<typeof dateRangePickerFrom>;

dayjs.extend(isBetween);

const dateRangePickerFrom = object({
  from: date().typeError("Invalid field").required("From is required"),
  to: date()
    .typeError("Invalid field")
    .when("optionalTo", {
      is: true,
      then: (schema) =>
        schema
          .required("This field is required")
          .test(
            "from",
            "Cannot be select month before From field",
            (to: Date, context) => {
              return dayjs(to).isAfter(dayjs(context.from?.[0].value?.from));
            }
          )
          .test(
            "from",
            "Maximum month range is 1 year",
            (to: Date, context) => {
              const validFromDate = dayjs(to).subtract(1, "year");
              const value = dayjs(
                dayjs(context.from?.[0].value?.from)
              ).isBetween(validFromDate, to, "month");
              return value;
            }
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
  optionalTo: boolean(),
});

type Props = {
  onSubmit: (data: any) => void;
};

export default function DateRangePicker({ onSubmit }: Props) {
  const { control, handleSubmit } = useForm<DateRangePickerForm>({
    defaultValues: {
      from: getPreviousMonth("dayjs").toDate(),
      to: getCurrentMonth("dayjs").toDate(),
      optionalTo: true,
    },
    resolver: yupResolver(dateRangePickerFrom),
    mode: "onChange",
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"row"} spacing={1}>
        <Controller
          name={"from"}
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              slotProps={{
                textField: {
                  size: "small",
                  helperText:
                    Boolean(fieldState.error) && fieldState.error?.message,
                  error: Boolean(fieldState.error),
                },
              }}
              views={["month", "year"]}
              label={"From"}
              format={"MM/YYYY"}
              {...field}
              onChange={(...args) => {
                field.onChange(...args);
              }}
              value={dayjs(field.value)}
            />
          )}
        />
        <Controller
          name={"to"}
          control={control}
          render={({ field, fieldState }) => (
            <DatePicker
              slotProps={{
                textField: {
                  size: "small",
                  helperText:
                    Boolean(fieldState.error) && fieldState.error?.message,
                  error: Boolean(fieldState.error),
                },
              }}
              views={["month", "year"]}
              label={"To"}
              format={"MM/YYYY"}
              {...field}
              value={dayjs(field.value)}
            />
          )}
        />
        <Box>
          <LoadingButton type={"submit"} size={"medium"} variant={"contained"}>
            Search
          </LoadingButton>
        </Box>
      </Stack>
    </Form>
  );
}
