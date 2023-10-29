import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import type { ChangeEvent, MouseEvent } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import Label from "@/components/label";
import { ListHead } from "@/components/list-head";
import { ListToolbar } from "@/components/list-toolbar";
import { Status } from "@/components/status";
import { useDebounce } from "@/hooks";
import { queryClient } from "@/lib/react-query";
import { fetchWithGet } from "@/lib/request";
import type { Pagination, StateNavigation } from "@/types";
import type { DriverResponse } from "@/types/driver";

import { DriverAction } from ".";

const TABLE_HEAD: TableHead[] = [
  { id: "id", label: "ID", alignRight: false },
  { id: "username", label: "Username", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phoneContact", label: "Phone Number", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "", label: "Action", alignRight: false },
];

export default function DriverTable() {
  const [pagination, setPagination] = useState<StateNavigation>({
    search: "",
    page: 0,
    pageSize: 10,
  });

  const debounceSearch = useDebounce(pagination.search, 300);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "/account-profile/drivers",
      {
        search: debounceSearch,
        page: pagination.page + 1,
        limit: pagination.pageSize,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<Pagination<DriverResponse>>({ queryKey, signal }),
  });

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: ["/managers", {}] });
    };
  }, []);

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPagination((prev) => ({ ...prev, pageSize: +event.target.value }));
  };

  const handleFilterByName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination((prev) => ({ ...prev, search: event.target.value }));
  };

  const emptyRows =
    pagination.page > 0
      ? Math.max(
          0,
          (1 + pagination.page) * pagination.pageSize -
            (data?.data.result?.totalCount as number)
        )
      : 0;

  const isNotFound = data?.data.result?.totalCount === 0;

  return (
    <>
      <ListToolbar
        filterName={pagination.search}
        onFilterName={handleFilterByName}
      />
      <TableContainer sx={{ minWidth: 800 }}>
        {data?.data.result?.data && !isLoading && !isFetching ? (
          <Table>
            <ListHead headLabel={TABLE_HEAD} />
            <TableBody>
              {data?.data.result?.data.map((driver: DriverResponse) => (
                <TableRow hover key={driver.id} tabIndex={-1}>
                  <TableCell align="left">{driver.id}</TableCell>
                  <TableCell align="left">{driver.username}</TableCell>
                  <TableCell align="left">{driver.email || "N/A"}</TableCell>
                  <TableCell align="left">
                    {driver.phoneNumber || "N/A"}
                  </TableCell>
                  <TableCell align="left">
                    <Label color={"default"}>
                      {driver.role === 2 && "Driver"}
                    </Label>
                  </TableCell>
                  <TableCell align="left">
                    <Status status={driver.status} />
                  </TableCell>
                  <TableCell align="left">
                    <DriverAction id={driver.id} status={driver.status} />
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>

                      <Typography variant="body2">
                        No results found for &nbsp;
                        <strong>&quot;{debounceSearch}&quot;</strong>.
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        ) : (
          <LinearProgress />
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.data.result?.totalCount || -1}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
