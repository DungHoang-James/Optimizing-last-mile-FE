import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Form from "@/components/form";
import Iconify from "@/components/iconify";
import { useAuth } from "@/hooks";
import { Types } from "@/providers/Auth/AuthContext";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useAuth();

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    dispatch({
      type: Types.LOGIN,
    });

    new Promise(() =>
      setTimeout(() => {
        dispatch({
          type: Types.LOGGEDIN,
        });
        navigate("/dashboard", { replace: true });
      }, 3000)
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField label="Email address" {...field} disabled={loading} />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                disabled={loading}
                {...field}
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
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                label="Remember me"
                control={<Checkbox disabled={loading} {...field} />}
              />
            )}
          />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>
        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          loading={loading}
        >
          Login
        </LoadingButton>
      </Form>
    </>
  );
}
