import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { MenuItem } from "@mui/material";
import type { MouseEvent } from "react";
import { useMutation } from "react-query";

import { updateStatusDriverMutation } from "@/mutations/driver";
import { STATUS_ENUM } from "@/utils/constants";

type Props = {
  id?: number;
  status: number;
  handleRefetch: () => void;
  handleCloseMenu: () => void;
};

export default function DriverStatus({
  id,
  status,
  handleRefetch,
  handleCloseMenu,
}: Props) {
  const { mutate } = useMutation(updateStatusDriverMutation, {
    onSuccess: () => {
      handleRefetch();
      handleCloseMenu();
    },
  });

  const onChange = (event: MouseEvent<HTMLLIElement>, status: number) => {
    event.stopPropagation();
    if (id) {
      mutate({ id, status });
    }
  };

  if (status === STATUS_ENUM.PENDING)
    return <DriverPending onChange={onChange} />;
  else if (status === STATUS_ENUM.ACTIVE)
    return <DriverActive onChange={onChange} />;
  else return <DriverInactive onChange={onChange} />;
}

type DriverProps = {
  onChange: (event: MouseEvent<HTMLLIElement>, status: number) => void;
};

const DriverPending = ({ onChange }: DriverProps) => {
  return (
    <>
      <MenuItem onClick={(event) => onChange(event, STATUS_ENUM.ACTIVE)}>
        <CheckIcon sx={{ mr: 2 }} color={"success"} />
        Active
      </MenuItem>
      <MenuItem onClick={(event) => onChange(event, STATUS_ENUM.REJECT)}>
        <CloseIcon sx={{ mr: 2 }} color={"error"} />
        Rejected
      </MenuItem>
    </>
  );
};

const DriverActive = ({ onChange }: DriverProps) => {
  return (
    <>
      <MenuItem onClick={(event) => onChange(event, STATUS_ENUM.INACTIVE)}>
        <LockPersonIcon sx={{ mr: 2 }} color={"disabled"} />
        Inactive
      </MenuItem>
    </>
  );
};

const DriverInactive = ({ onChange }: DriverProps) => {
  return (
    <>
      <MenuItem onClick={(event) => onChange(event, STATUS_ENUM.ACTIVE)}>
        <CheckIcon sx={{ mr: 2 }} />
        Active
      </MenuItem>
    </>
  );
};
