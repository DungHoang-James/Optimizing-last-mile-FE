import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRef, useState } from "react";

import { Loading } from "@/components/loading";
import type { Manager } from "@/types";

import { ManagerForm } from ".";

type Props = {
  id?: number;
  open: boolean;
  handleClose: () => void;
  status: "create" | "edit";
  loading?: boolean;
  defaultValues: Manager;
};

export default function ManagerDialog({
  id,
  open,
  handleClose,
  status,
  loading,
  defaultValues,
}: Props): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submit, setSubmit] = useState(false);

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  const handleStateSubmit = () => {
    setSubmit((prev) => !prev);
  };

  const labelStatus = status === "create" ? "Create" : "Edit";

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={"lg"} fullWidth>
        <DialogTitle>{labelStatus} Manager</DialogTitle>
        <DialogContent
          sx={{
            ".MuiDialogContent-root&.MuiDialogContent-root": {
              pt: 2,
            },
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <ManagerForm
              id={id}
              formRef={formRef}
              status={status}
              defaultValues={defaultValues}
              handleClose={handleClose}
              handleStateSubmit={handleStateSubmit}
            />
          )}
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant={"contained"}
            color={"inherit"}
            onClick={handleClose}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant={"contained"}
            onClick={handleSubmit}
            loading={submit}
          >
            {labelStatus}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
