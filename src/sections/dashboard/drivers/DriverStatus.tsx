import CheckIcon from "@mui/icons-material/Check";
import { MenuItem } from "@mui/material";

type Props = {
  status: number;
};

export default function DriverStatus({ status }: Props) {
  return (
    <>
      <MenuItem>
        <CheckIcon sx={{ mr: 2 }} />
        Edit
      </MenuItem>
      <MenuItem>
        <CheckIcon sx={{ mr: 2 }} />
        Edit
      </MenuItem>
      <MenuItem>
        <CheckIcon sx={{ mr: 2 }} />
        Edit
      </MenuItem>
    </>
  );
}
