import { InputLabel, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import Form from "@/components/form";

export default function ManagerForm(): JSX.Element {
  return (
    <>
      <Form>
        <Stack spacing={1}>
          <Stack flexDirection={"row"} justifyContent={"center"} columnGap={2}>
            <Stack width={"100%"} spacing={1}>
              <Stack spacing={1}>
                <InputLabel required>Username</InputLabel>
                <TextField type={"text"} placeholder={"Enter username"} />
              </Stack>
              <Stack spacing={1}>
                <InputLabel required>Password</InputLabel>
                <TextField type={"password"} placeholder={"Enter password"} />
              </Stack>
              <Stack spacing={1}>
                <InputLabel required>Province</InputLabel>
                <TextField type={"text"} placeholder="Enter province" />
              </Stack>
              <Stack spacing={1}>
                <InputLabel required>Ward</InputLabel>
                <TextField type={"text"} placeholder="Enter ward" />
              </Stack>
            </Stack>
            <Stack width={"100%"} spacing={1}>
              <Stack spacing={1}>
                <InputLabel required>Name</InputLabel>
                <TextField type={"text"} placeholder="Enter name" />
              </Stack>
              <Stack spacing={1}>
                <InputLabel required>Date of Birth</InputLabel>
                <DatePicker />
              </Stack>
              <Stack spacing={1}>
                <InputLabel required>Phone Number</InputLabel>
                <TextField type={"tel"} placeholder="Enter phone number" />
              </Stack>
              <Stack spacing={1}>
                <InputLabel required>District</InputLabel>
                <TextField type={"text"} placeholder="Enter district" />
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing={1}>
            <InputLabel required>Address</InputLabel>
            <TextField type={"text"} />
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
