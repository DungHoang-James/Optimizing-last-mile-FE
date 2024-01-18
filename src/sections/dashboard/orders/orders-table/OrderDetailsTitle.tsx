import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { GoBackButton } from "@/components/go-back-button";
import { useCopyToClipboard } from "@/hooks";

export default function OrderDetailsTitle() {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const [, copy] = useCopyToClipboard();

  const handleCopy = async (id?: string) => {
    if (!id) return;
    setLoading(true);
    const isSuccess = await copy(id);
    setSuccess(isSuccess);
    setLoading(false);
  };

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      justifyContent="space-between"
      mb={2}
    >
      <GoBackButton pathname="/dashboard/orders" />
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
        <Typography variant={"subtitle1"}>
          ID:{" "}
          <Typography
            component={"span"}
            variant={"body1"}
            color={"primary.main"}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => handleCopy(params.id)}
          >
            {params.id}
          </Typography>
        </Typography>
        {loading ? (
          <CircularProgress size={"1.5rem"} />
        ) : success ? (
          <CheckIcon fontSize={"small"} />
        ) : (
          <IconButton
            disableRipple
            size={"small"}
            onClick={() => handleCopy(params.id)}
          >
            <ContentCopyIcon fontSize={"small"} />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
}
