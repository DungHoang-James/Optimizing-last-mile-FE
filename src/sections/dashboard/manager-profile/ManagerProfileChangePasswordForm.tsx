import { yupResolver } from "@hookform/resolvers/yup";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState, type MutableRefObject } from "react";
import { Controller, useForm } from "react-hook-form";
import type { InferType } from "yup";
import { object, ref, string } from "yup";

import Form from "@/components/form";
import Iconify from "@/components/iconify";

export type ChangePasswordFormSchema = InferType<
  typeof changePasswordFormSchema
>;

type Props = {
  formRef: MutableRefObject<HTMLFormElement | null>;
  onSubmit: (data: ChangePasswordFormSchema) => void;
};

type ShowPasswordState = {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};

const changePasswordFormSchema = object({
  oldPassword: string().required("Old Password is required"),
  newPassword: string()
    .test(
      "is_match_old_password",
      "New Password must not match Old Password",
      (value, context) => !(value === context.parent.oldPassword)
    )
    .required("New Password is required"),
  confirmPassword: string()
    .oneOf([ref("newPassword")], "Password must match")
    .required("Confirm Password is required"),
});

export default function ManagerProfileChangePasswordForm({
  formRef,
  onSubmit,
}: Props) {
  const { control, handleSubmit } = useForm<ChangePasswordFormSchema>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(changePasswordFormSchema),
  });

  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleShowPassword = (value: keyof ShowPasswordState) => {
    setShowPassword((prev) => ({ ...prev, [value]: true }));
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={1}>
        <Stack spacing={1}>
          <InputLabel required>Old Password</InputLabel>
          <Controller
            name={"oldPassword"}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={Boolean(fieldState.error)}
                helperText={
                  Boolean(fieldState.error) && fieldState.error?.message
                }
                type={showPassword.oldPassword ? "text" : "password"}
                placeholder="Enter Old Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleShowPassword("oldPassword")}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>
        <Stack spacing={1}>
          <InputLabel required>New Password</InputLabel>
          <Controller
            name={"newPassword"}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={Boolean(fieldState.error)}
                helperText={
                  Boolean(fieldState.error) && fieldState.error?.message
                }
                type={showPassword.newPassword ? "text" : "password"}
                placeholder="Enter New Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleShowPassword("newPassword")}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>
        <Stack spacing={1}>
          <InputLabel required>Confirm Password</InputLabel>
          <Controller
            name={"confirmPassword"}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={Boolean(fieldState.error)}
                helperText={
                  Boolean(fieldState.error) && fieldState.error?.message
                }
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Enter Confirm Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleShowPassword("confirmPassword")}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>
      </Stack>
    </Form>
  );
}
