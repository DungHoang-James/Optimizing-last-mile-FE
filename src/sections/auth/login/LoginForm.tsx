import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import type { AxiosError } from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { object, string } from "yup";

import Form from "@/components/form";
import Iconify from "@/components/iconify";
import { useAuth } from "@/hooks";
import { loginMutation } from "@/mutations/auth";
import { Types } from "@/providers/Auth/AuthContext";

type FormValues = {
  username: string;
  password: string;
};

const loginWithUsernameSchema = object({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});

export default function LoginForm(): JSX.Element {
  const { mutate, isLoading } = useMutation(loginMutation);
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginWithUsernameSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { dispatch } = useAuth();

  const onSubmit = ({ username, password }: FormValues) => {
    mutate(
      {
        username,
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
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={Boolean(fieldState.error)}
              helperText={
                Boolean(fieldState.error) && fieldState.error?.message
              }
              label="Username"
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
