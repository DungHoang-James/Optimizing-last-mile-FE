import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import type { CsvError } from "csv-parse/browser/esm";
import { parse } from "csv-parse/browser/esm/sync";
import { useSnackbar } from "notistack";
import { useCallback, useState, type ChangeEvent } from "react";

import { useRecordStore } from "@/stores/records";
import type { RecordState } from "@/types";

import OrderUploadFileDialog from "./OrderUploadFileDialog";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function OrderUploadFile() {
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { loadingBatch, toggleLoading, addRecords } = useRecordStore();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt: ProgressEvent<FileReader>) => {
      if (!evt?.target?.result) {
        return;
      }
      setLoading(true);

      const { result } = evt.target;

      try {
        const records = parse(result as string, {
          columns: [
            "ownerId",
            "driverId",
            "senderName",
            "senderPhoneNumber",
            "recipientName",
            "recipientPhoneNumber",
            "expectedShippingDate",
            "note",
            "shippingAddress",
          ],
          on_record: (record: RecordState["order"], { lines }) => {
            const { ownerId, driverId, ...rest } = record;
            return {
              no: lines - 2,
              order: {
                ...rest,
                ownerId: +ownerId,
                ...(driverId && +driverId && { driverId: +driverId }),
              },
            };
          },
          delimiter: ";",
          from_line: 2,
          trim: true,
          skip_empty_lines: true,
        });
        toggleLoading();
        addRecords(records);
      } catch (error) {
        enqueueSnackbar({
          variant: "error",
          message: (error as CsvError)?.message,
        });
      }
    };

    reader.onloadend = () => {
      setLoading(false);
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const handleClose = useCallback(() => {
    addRecords(null);
  }, [addRecords]);

  return (
    <>
      <LoadingButton
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        loading={loading || loadingBatch}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          accept="*.csv"
          onChange={handleFileUpload}
          onClick={(event) => {
            event.currentTarget.value = "";
          }}
          disabled={loading || loadingBatch}
        />
      </LoadingButton>
      <OrderUploadFileDialog handleClose={handleClose} />
    </>
  );
}
