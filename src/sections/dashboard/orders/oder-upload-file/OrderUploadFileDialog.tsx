import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import { useRecordStore } from "@/stores/records";

import OrderUploadFileTable from "./OrderUploadFileTable";

type Props = {
  handleClose: () => void;
};

export default function OrderUploadFileDialog({ handleClose }: Props) {
  const { records } = useRecordStore();

  return (
    <Dialog fullWidth maxWidth={"lg"} open={!!records} onClose={handleClose}>
      <DialogTitle>Processing Orders</DialogTitle>
      <DialogContent>
        <Stack direction={"column"} spacing={1}>
          <Typography variant={"subtitle1"} color={"error.main"}>
            WARNING: Do not close this dialog until the process is complete
          </Typography>
          {records && <OrderUploadFileTable />}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
