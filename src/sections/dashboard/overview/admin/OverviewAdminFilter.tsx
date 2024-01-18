import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useForm } from "react-hook-form";
import { boolean, date, number, object, string, type InferType } from "yup";

import Form from "@/components/form";
import { getCurrentMonth, getPreviousMonth } from "@/utils/helper";

import OverviewAdminRangePicker from "./OverviewAdminRangePicker";

import { OverviewAdminDropdown } from ".";

export type FilterStatistics = InferType<typeof filterStatistics>;

dayjs.extend(isBetween);

const filterStatistics = object({
  manager: object({
    id: number().required(),
    name: string().required(),
  })
    .test(
      "manager",
      "Manager is required",
      (manager) =>
        Object.keys(manager).length > 0 ||
        Boolean((manager.id === 0 || manager.id) && manager.name)
    )
    .nonNullable()
    .required("Manager is required"),
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
  onSubmit: (data: FilterStatistics) => void;
};

export default function OverviewAdminFilter({ onSubmit }: Props): JSX.Element {
  const { control, handleSubmit } = useForm<FilterStatistics>({
    defaultValues: {
      manager: {},
      from: getPreviousMonth("dayjs").toDate(),
      to: getCurrentMonth("dayjs").toDate(),
      optionalTo: true,
    },
    resolver: yupResolver(filterStatistics),
    mode: "onChange",
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1} direction={"row"} alignItems={"start"}>
        <OverviewAdminDropdown control={control} />
        <OverviewAdminRangePicker control={control} />
        <Box>
          <LoadingButton type={"submit"} size={"medium"} variant={"contained"}>
            Search
          </LoadingButton>
        </Box>
      </Stack>
    </Form>
  );
}
