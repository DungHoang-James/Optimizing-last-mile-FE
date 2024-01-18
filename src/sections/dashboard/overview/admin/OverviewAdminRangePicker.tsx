import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { FilterStatistics } from "./OverviewAdminFilter";

type Props = {
  control: Control<FilterStatistics>;
};

export default function OverviewAdminRangePicker({
  control,
}: Props): JSX.Element {
  return (
    <>
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
    </>
  );
}
