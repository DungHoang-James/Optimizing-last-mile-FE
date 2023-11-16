import {
  Card,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import OrderDropdown from "./OrderDropdown";
import type { OrderFormValue } from "./OrderForm";

type Props = {
  disabled: boolean;
};

export default function OrderInformation({ disabled }: Props) {
  const {
    register,
    getValues,
    setValue,
    formState: {
      errors: {
        recipientName,
        recipientPhoneNumber,
        expectedShippingDate,
        senderName,
        senderPhoneNumber,
      },
    },
  } = useFormContext<OrderFormValue>();

  return (
    <Card
      sx={{
        py: 2,
        px: 2.5,
      }}
    >
      <Stack spacing={2}>
        <Typography variant={"h6"}>Order Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <OrderDropdown
              inputLabel={"Owner Name"}
              placeholder={"Enter Owner Name"}
              name={"ownerId"}
              role={3}
              required
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <OrderDropdown
              inputLabel={"Diver Name"}
              placeholder={"Enter Driver Name"}
              role={2}
              name={"driverId"}
              disabled={disabled}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel required>Sender Name</InputLabel>
              <TextField
                type={"text"}
                placeholder={"Enter Sender Name"}
                disabled={disabled}
                defaultValue={getValues("senderName")}
                {...register("senderName")}
                error={Boolean(senderName)}
                helperText={Boolean(senderName) && senderName?.message}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel required>Sender Phone Number</InputLabel>
              <TextField
                type={"text"}
                placeholder={"Enter Phone Number"}
                disabled={disabled}
                defaultValue={getValues("senderPhoneNumber")}
                {...register("senderPhoneNumber")}
                error={Boolean(senderPhoneNumber)}
                helperText={
                  Boolean(senderPhoneNumber) && senderPhoneNumber?.message
                }
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel required>Recipient Name</InputLabel>
              <TextField
                type={"text"}
                placeholder={"Enter Recipient Name"}
                disabled={disabled}
                defaultValue={getValues("recipientName")}
                {...register("recipientName")}
                error={Boolean(recipientName)}
                helperText={Boolean(recipientName) && recipientName?.message}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel required>Recipient Phone Number</InputLabel>
              <TextField
                type={"text"}
                placeholder={"Enter Recipient Phone Number"}
                disabled={disabled}
                defaultValue={getValues("recipientPhoneNumber")}
                {...register("recipientPhoneNumber")}
                error={Boolean(recipientPhoneNumber)}
                helperText={
                  Boolean(recipientPhoneNumber) && recipientPhoneNumber?.message
                }
              />
            </Stack>
          </Grid>
        </Grid>
        <Stack spacing={1}>
          <InputLabel required>Expected Shipping Date</InputLabel>
          <DatePicker
            disabled={disabled}
            disablePast
            format={"DD/MM/YYYY"}
            value={
              getValues("expectedShippingDate")
                ? dayjs(getValues("expectedShippingDate"))
                : null
            }
            inputRef={register("expectedShippingDate").ref}
            onChange={(date) => {
              setValue(
                "expectedShippingDate",
                dayjs(date).format("YYYY-MM-DD")
              );
            }}
            slotProps={{
              textField: {
                onBlur: register("expectedShippingDate").onBlur,
                helperText:
                  Boolean(expectedShippingDate) &&
                  expectedShippingDate?.message,
                error: Boolean(expectedShippingDate),
              },
            }}
          />
        </Stack>
        <Stack spacing={1}>
          <InputLabel>Note</InputLabel>
          <TextField
            disabled={disabled}
            multiline
            type={"text"}
            placeholder={"Enter username"}
            rows={4}
            defaultValue={getValues("note")}
            {...register("note")}
          />
        </Stack>
      </Stack>
    </Card>
  );
}
