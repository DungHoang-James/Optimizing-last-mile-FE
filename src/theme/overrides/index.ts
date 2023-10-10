//
import type { Theme } from "@mui/material";

import Accordion from "./Accordion";
import Autocomplete from "./Autocomplete";
import Avatar from "./Avatar";
import Backdrop from "./Backdrop";
import Breadcrumbs from "./Breadcrumbs";
import Button from "./Button";
import Card from "./Card";
import Chip from "./Chip";
import DataGrid from "./DataGrid";
import FormLabel from "./FormLabel";
import IconButton from "./IconButton";
import Input from "./Input";
import InputLabel from "./InputLabel";
import Link from "./Link";
import Lists from "./Lists";
import Pagination from "./Pagination";
import Paper from "./Paper";
import Select from "./Select";
import Skeleton from "./Skeleton";
import TablePagination from "./TablePagination";
import Tabs from "./Tabs";
import Timeline from "./Timeline";
import Typography from "./Typography";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Button(theme),
    Card(theme),
    Paper(),
    Backdrop(theme),
    Input(theme),
    IconButton(theme),
    Autocomplete(theme),
    Lists(theme),
    Typography(theme),
    DataGrid(theme),
    TablePagination(theme),
    Link(),
    Breadcrumbs(theme),
    Pagination(theme),
    Accordion(theme),
    Skeleton(theme),
    Timeline(theme),
    FormLabel(theme),
    InputLabel(theme),
    Chip(theme),
    Tabs(theme),
    Avatar(theme),
    Select(theme)
  );
}
