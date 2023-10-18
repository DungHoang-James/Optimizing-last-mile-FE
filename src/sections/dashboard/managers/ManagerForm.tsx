import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import Form from "@/components/form";

export default function ManagerForm(): JSX.Element {
  return (
    <>
      <Form>
        <Stack flexDirection={"row"} justifyContent={"center"} columnGap={2}>
          <Stack width={"100%"} spacing={1}>
            <TextField label="Username" type={"text"} />
            <TextField label="Password" type={"password"} />
          </Stack>
          <Stack width={"100%"} spacing={1}>
            <TextField label="Name" type={"text"} />
            <DatePicker label="Date of Birth" />
            <TextField label="Address" type={"text"} />
            <TextField label="Phone Number" type={"tel"} />
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
