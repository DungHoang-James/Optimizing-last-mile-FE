import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, InputLabel, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import type { MutableRefObject } from "react";
import { Controller, useForm } from "react-hook-form";
import type { InferType } from "yup";
import { object, string } from "yup";

import Form from "@/components/form";

export type ProfileFormValue = InferType<typeof profileFormSchema>;

type Props = {
  disabled: boolean;
  formRef: MutableRefObject<HTMLFormElement | null>;
  defaultValues?: ProfileFormValue;
  onSubmit: (data: ProfileFormValue) => void;
};

const profileFormSchema = object({
  name: string().required("Name is required"),
  birthDay: string().nullable().required("Date of Birth is required"),
  province: string().required("Province is required"),
  district: string().required("District is required"),
  ward: string().required("Ward is required"),
  address: string().required("Address is required"),
  phoneContact: string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Phone number is not valid"
    )
    .required("Phone Number is required"),
});

export default function ProfileForm({
  disabled,
  formRef,
  defaultValues,
  onSubmit,
}: Props): JSX.Element {
  const { control, handleSubmit } = useForm<ProfileFormValue>({
    defaultValues: defaultValues,
    resolver: yupResolver(profileFormSchema),
  });

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel required>Name</InputLabel>
              <Controller
                name={"name"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={
                      Boolean(fieldState.error) && fieldState.error?.message
                    }
                    type={"text"}
                    placeholder="Enter name"
                    disabled={disabled}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel required>Ward</InputLabel>
              <Controller
                name={"ward"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={
                      Boolean(fieldState.error) && fieldState.error?.message
                    }
                    type={"text"}
                    placeholder="Enter ward"
                    disabled={disabled}
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel required>Phone Number</InputLabel>
              <Controller
                name={"phoneContact"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={
                      Boolean(fieldState.error) && fieldState.error?.message
                    }
                    type={"tel"}
                    placeholder="Enter phone number"
                    disabled={disabled}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel required>Province</InputLabel>
              <Controller
                name={"province"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={
                      Boolean(fieldState.error) && fieldState.error?.message
                    }
                    type={"text"}
                    placeholder="Enter province"
                    disabled={disabled}
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel required>Date of Birth</InputLabel>
              <Controller
                name={"birthDay"}
                control={control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    value={dayjs(field.value)}
                    inputRef={field.ref}
                    onChange={(date) => {
                      field.onChange(dayjs(date).format("YYYY-MM-DD"));
                    }}
                    disableFuture
                    slotProps={{
                      textField: {
                        helperText:
                          Boolean(fieldState.error) &&
                          fieldState.error?.message,
                        error: Boolean(fieldState.error),
                      },
                    }}
                    disabled={disabled}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel required>District</InputLabel>
              <Controller
                name={"district"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={
                      Boolean(fieldState.error) && fieldState.error?.message
                    }
                    type={"text"}
                    placeholder="Enter district"
                    disabled={disabled}
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel required>Address</InputLabel>
              <Controller
                name={"address"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={
                      Boolean(fieldState.error) && fieldState.error?.message
                    }
                    type={"text"}
                    placeholder={"Enter address"}
                    disabled={disabled}
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Form>
  );
}
