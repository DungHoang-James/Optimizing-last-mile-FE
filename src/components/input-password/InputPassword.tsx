import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

import Iconify from "../iconify";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
}

export default function InputPassword({
  field,
  fieldState,
}: Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...field}
      error={Boolean(fieldState.error)}
      helperText={Boolean(fieldState.error) && fieldState.error?.message}
      type={showPassword ? "text" : "password"}
      placeholder={"Enter password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              <Iconify
                icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
