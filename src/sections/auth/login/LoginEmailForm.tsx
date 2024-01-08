import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  FormHelperText,
  InputAdornment,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import type { AxiosError } from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import type { InferType } from "yup";
import { object, string } from "yup";

import Form from "@/components/form";
import Iconify from "@/components/iconify";
import { useAuth } from "@/hooks";
import { loginEmailMutation } from "@/mutations/auth";
import { Types } from "@/providers/Auth/AuthContext";

export type LoginWithEmailForm = InferType<typeof loginForm>;

const loginForm = object({
  email: string().email("Invalid Email").required("Email is required"),
  password: string().required("Password is required"),
});

export default function LoginEmailForm() {
  const { mutate, isLoading } = useMutation(loginEmailMutation);
  const { control, handleSubmit } = useForm<LoginWithEmailForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginForm),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { dispatch } = useAuth();

  const onSubmit = ({ email, password }: LoginWithEmailForm) => {
    mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          if (!data) return;
          return dispatch({
            type: Types.LOGIN,
            payload: {
              jwtToken: data?.data.result?.jwtToken,
            },
          });
        },
        onError: (data) => {
          const results = data as AxiosError<any, any>;
          setError(results.response?.data.errorMessage as string);
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type={"email"}
              error={Boolean(fieldState.error)}
              helperText={
                Boolean(fieldState.error) && fieldState.error?.message
              }
              label="Email"
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={Boolean(fieldState.error)}
              helperText={
                Boolean(fieldState.error) && fieldState.error?.message
              }
              disabled={isLoading}
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
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
        <FormHelperText error>{error}</FormHelperText>
      </Stack>
      <LoadingButton
        sx={{
          mt: 2,
        }}
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        loading={isLoading}
      >
        Login
      </LoadingButton>
    </Form>
  );
}
