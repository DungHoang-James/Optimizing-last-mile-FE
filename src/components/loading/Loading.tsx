import { CircularProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack minHeight={400} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress disableShrink />
    </Stack>
  );
}
