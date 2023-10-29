import { IconButton, MenuItem, Popover } from "@mui/material";
import dayjs from "dayjs";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useQuery } from "react-query";

import Iconify from "@/components/iconify";
import { fetchWithGet } from "@/lib/request";
import type { Managers } from "@/types/managers";

import ManagerDeletePopup from "./ManagerDeletePopup";

import { ManagerDialog } from ".";

type Props = {
  id?: number;
  handleRefetch: () => void;
};

export default function ManagerAction({
  id,
  handleRefetch,
}: Props): JSX.Element {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`/managers/${id}`, {}],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<Managers>({ queryKey, signal }),
    enabled: !!open && !!id && openDialog,
    select: (data) => {
      if (data?.data.result?.birthDay) {
        data.data.result.birthDay = dayjs(data.data.result.birthDay);
      }

      return {
        ...data,
      };
    },
  });

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  return (
    <>
      <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
        <Iconify icon={"eva:more-vertical-fill"} />
      </IconButton>
      {data && data?.data && data?.data.result && (
        <ManagerDialog
          id={id}
          open={openDialog}
          handleClose={handleDialog}
          status={"edit"}
          loading={isLoading || isFetching}
          defaultValues={data?.data.result}
        />
      )}
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleDialog}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <ManagerDeletePopup id={id} handleRefetch={handleRefetch} />
      </Popover>
    </>
  );
}
