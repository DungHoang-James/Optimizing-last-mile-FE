import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Stack } from "@mui/material";
import { useRef } from "react";
import { useMutation } from "react-query";

import { updateManagerPassword } from "@/mutations/profile";

import type { ChangePasswordFormSchema } from "./ManagerProfileChangePasswordForm";
import ManagerProfileChangePasswordForm from "./ManagerProfileChangePasswordForm";

type Props = {
  email: string;
  isLoading: boolean;
};

export default function ManagerProfileChangePassword({
  email,
  isLoading,
}: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { mutate, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: (data: ChangePasswordFormSchema) =>
      updateManagerPassword(data, email as string),
  });

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  const handleReset = () => {
    formRef.current?.reset();
  };

  const onSubmit = (data: ChangePasswordFormSchema) => {
    mutate(data);
  };

  return (
    <>
      <Card>
        <CardContent>
          <ManagerProfileChangePasswordForm
            formRef={formRef}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
      <Stack mt={3} direction={"row"} spacing={1} justifyContent={"flex-end"}>
        <LoadingButton
          size={"medium"}
          variant={"outlined"}
          color={"error"}
          onClick={handleReset}
          disabled={isLoading || isLoadingUpdate}
        >
          Reset
        </LoadingButton>
        <LoadingButton
          size={"medium"}
          variant={"contained"}
          onClick={handleSubmit}
          loading={isLoading || isLoadingUpdate}
        >
          Submit
        </LoadingButton>
      </Stack>
    </>
  );
}
