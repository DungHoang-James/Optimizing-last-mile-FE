import { InputLabel, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import type { MutableRefObject } from "react";
import { Controller, useForm } from "react-hook-form";

import Form from "@/components/form";

type FormValues = {
  name?: string;
  birthDay?: Date | Dayjs | null;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  phoneContact?: string;
};

type Props = {
  disabled: boolean;
  formRef: MutableRefObject<HTMLFormElement | null>;
  defaultValues: FormValues;
};

export default function ProfileForm({
  disabled,
  formRef,
  defaultValues,
}: Props): JSX.Element {
  const { control } = useForm<FormValues>({
    defaultValues: defaultValues,
  });

  return (
    <Form ref={formRef}>
      <Stack spacing={1}>
        <Stack flexDirection={"row"} justifyContent={"center"} columnGap={2}>
          <Stack width={"100%"} spacing={1}>
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
            <Stack spacing={1}>
              <InputLabel required>Date of Birth</InputLabel>
              <Controller
                name={"birthDay"}
                control={control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    value={field.value}
                    inputRef={field.ref}
                    onChange={(date) => {
                      field.onChange(date);
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
          </Stack>
          <Stack width={"100%"} spacing={1}>
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
          </Stack>
        </Stack>
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
      </Stack>
    </Form>
  );
}
