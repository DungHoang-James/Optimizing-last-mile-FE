import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Stack } from "@mui/material";
import { useRef } from "react";
import { useMutation } from "react-query";

import { updateProfileMutation } from "@/mutations/profile";

import { ProfileForm } from "../profile";
import type { ProfileFormValue } from "../profile/ProfileForm";

type Props = {
  id: string;
  data: ProfileFormValue;
  isLoading: boolean;
};

export default function ManagerProfileForm({ id, data, isLoading }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  const handleReset = () => {
    formRef.current?.reset();
  };

  const { mutate, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: (data: ProfileFormValue) =>
      updateProfileMutation(data, id as string),
  });

  const onSubmit = (data: ProfileFormValue) => {
    mutate(data);
  };

  return (
    <>
      <Card>
        <CardContent>
          <ProfileForm
            disabled={!data || isLoading}
            formRef={formRef}
            defaultValues={data}
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
          disabled={isLoadingUpdate}
        >
          Reset
        </LoadingButton>
        <LoadingButton
          size={"medium"}
          variant={"contained"}
          onClick={handleSubmit}
          loading={isLoadingUpdate}
        >
          Submit
        </LoadingButton>
      </Stack>
    </>
  );
}
