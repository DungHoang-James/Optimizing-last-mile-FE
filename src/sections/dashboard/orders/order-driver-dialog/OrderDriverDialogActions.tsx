import { Button, DialogActions } from "@mui/material";

import { useOrderDialog } from "@/hooks";

type Props = {
  handleClose: () => void;
};

export default function OrderDriverDialogActions({ handleClose }: Props) {
  const { handleSubmit } = useOrderDialog();

  return (
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
      <Button variant={"contained"} onClick={handleSubmit}>
        Submit
      </Button>
    </DialogActions>
  );
}
