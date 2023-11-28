import { Alert, AlertProps, Snackbar, type SnackbarProps } from "@mui/material";
import type { FC } from "react";
import { create } from "zustand";

const useSnackbarStore = create<{
  props: Omit<SnackbarProps, "open" | "key">;
  key: number;
  open: boolean;
  errorMessage: string;
  severity?: AlertProps["severity"];
}>(() => ({ props: {}, key: 0, open: false, errorMessage: "" }));

type Props = {
  errorMessage: string;
  severity: AlertProps["severity"];
} & Omit<SnackbarProps, "open" | "key">;

export const openSnackbar = ({ errorMessage, severity, ...rest }: Props) => {
  useSnackbarStore.setState({
    props: rest,
    key: new Date().valueOf(),
    open: true,
    errorMessage,
    severity,
  });
};

export const SnackbarHost: FC = () => {
  const snackbarStore = useSnackbarStore();

  const handleClose = () =>
    // e?: React.SyntheticEvent | Event,
    // reason?: SnackbarCloseReason
    {
      useSnackbarStore.setState({ open: false });
      // snackbarStore.props.onClose?.(e, reason);
    };

  return (
    <Snackbar
      autoHideDuration={3500}
      {...snackbarStore.props}
      open={snackbarStore.open}
      onClose={handleClose}
      key={snackbarStore.key}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity={snackbarStore.severity} onClose={handleClose}>
        {snackbarStore.errorMessage}
      </Alert>
    </Snackbar>
  );
};
