import { yupResolver } from "@hookform/resolvers/yup";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import type { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { omit } from "lodash";
import { useState, type MutableRefObject } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { date, object, string } from "yup";

import Form from "@/components/form";
import Iconify from "@/components/iconify";
import { queryClient } from "@/lib/react-query";
import {
  createManagerMutation,
  updateManagerMutation,
} from "@/mutations/manager";
import type {
  CreateManagerPayload,
  Manager,
  Response,
  UpdateManagerPayload,
} from "@/types";

const StyledStack = styled(Stack)(() => ({
  flex: "calc(50% - 16px)",
}));

export type ManagerFormValues = {
  username: string;
  password: string;
  name: string;
  birthDay: Date;
  province: string;
  district: string;
  ward: string;
  address: string;
  phoneContact: string;
};

const managerSchemaCreate = object({
  username: string()
    .max(50, "Username cannot be greater than 50 characters")
    .required("Username is required"),
  password: string()
    .max(50, "Password cannot be greater than 50 characters")
    .required("Password is required"),
  name: string()
    .max(200, "Name cannot be greater than 200 characters")
    .required("Name is required"),
  birthDay: date().required("Date of Birth is required"),
  province: string()
    .max(200, "Province cannot be greater than 200 characters")
    .required("Province is required"),
  district: string()
    .max(200, "District cannot be greater than 200 characters")
    .required("District is required"),
  ward: string()
    .max(200, "Ward cannot be greater than 200 characters")
    .required("Ward is required"),
  address: string()
    .max(200, "Address cannot be greater than 200 characters")
    .required("Address is required"),
  phoneContact: string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      "Phone number is not valid"
    )
    .required("Phone Number is required"),
});

const managerSchemaEdit = managerSchemaCreate.omit(["password"]);

type Props = {
  id?: number;
  formRef: MutableRefObject<HTMLFormElement | null>;
  status: "create" | "edit";
  defaultValues: ManagerFormValues | Omit<Manager, "id" | "password">;
  handleClose: () => void;
  handleStateSubmit: () => void;
};

export default function ManagerForm({
  id,
  formRef,
  status,
  defaultValues,
  handleClose,
  handleStateSubmit,
}: Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<
    ManagerFormValues | Omit<Manager, "id" | "password">
  >({
    defaultValues: defaultValues,
    resolver: yupResolver(
      status === "create" ? managerSchemaCreate : (managerSchemaEdit as any)
    ),
  });

  const { mutate } = useMutation<
    AxiosResponse<Response<any>, any> | undefined,
    unknown,
    CreateManagerPayload | UpdateManagerPayload,
    unknown
  >({
    mutationFn: (data) =>
      status === "create"
        ? createManagerMutation(data as CreateManagerPayload)
        : updateManagerMutation(data, id as number),
    onSuccess: () => {
      handleStateSubmit();
      handleClose();
      queryClient.refetchQueries({
        queryKey: ["/managers", { page: 1, limit: 10 }],
      });
    },
    onError: () => {
      handleStateSubmit();
    },
  });

  const onSubmit = (
    data: ManagerFormValues | Omit<Manager, "id" | "password">
  ) => {
    handleStateSubmit();
    const birthDay = dayjs(data.birthDay).format("YYYY-MM-DD");
    const results = omit(data, ["status", "id"]);
    if (status === "create") {
      mutate({
        ...results,
        birthDay,
      } as CreateManagerPayload);
    } else {
      mutate({
        name: results.name,
        address: results.address,
        district: results.district,
        phoneContact: results.phoneContact,
        province: results.province,
        ward: results.ward,
        birthDay,
      } as UpdateManagerPayload);
    }
  };

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            flexWrap={"wrap"}
            columnGap={2}
            rowGap={1}
          >
            {status === "create" && (
              <>
                <StyledStack spacing={1}>
                  <InputLabel required>Username</InputLabel>
                  <Controller
                    name={"username"}
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type={"text"}
                        placeholder={"Enter username"}
                        error={Boolean(fieldState.error)}
                        helperText={
                          Boolean(fieldState.error) && fieldState.error?.message
                        }
                      />
                    )}
                  />
                </StyledStack>
                <StyledStack spacing={1}>
                  <InputLabel required>Password</InputLabel>
                  <Controller
                    name={"password"}
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        error={Boolean(fieldState.error)}
                        helperText={
                          Boolean(fieldState.error) && fieldState.error?.message
                        }
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
                                  icon={
                                    showPassword
                                      ? "eva:eye-fill"
                                      : "eva:eye-off-fill"
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </StyledStack>
              </>
            )}
            <StyledStack spacing={1}>
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
                  />
                )}
              />
            </StyledStack>
            <StyledStack spacing={1}>
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
                  />
                )}
              />
            </StyledStack>
            <StyledStack spacing={1}>
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
                  />
                )}
              />
            </StyledStack>
            <StyledStack spacing={1}>
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
                  />
                )}
              />
            </StyledStack>
            <StyledStack spacing={1}>
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
                  />
                )}
              />
            </StyledStack>
            <StyledStack spacing={1}>
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
                  />
                )}
              />
            </StyledStack>
            <StyledStack spacing={1}>
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
                  />
                )}
              />
            </StyledStack>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
