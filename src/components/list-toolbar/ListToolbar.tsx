import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import type { ChangeEvent } from "react";

import Iconify from "@/components/iconify";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

type Props = {
  filterName: string;
  onFilterName: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function ListToolbar({ filterName, onFilterName }: Props) {
  return (
    <StyledRoot>
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder="Search name..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />

      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon="ic:round-filter-list" />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}
