import {
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import type { ChangeEvent, MouseEvent } from "react";
import { useState } from "react";
import { useQuery } from "react-query";

import { useDebounce } from "@/hooks";
import { fetchWithGet } from "@/lib/request";
import type { TableHead } from "@/types";
import type { Managers } from "@/types/managers";
import type { Pagination, StateNavigation } from "@/types/pagination";
import { fDate } from "@/utils/formatTime";

import {
  ManagerAction,
  ManagerListHead,
  ManagerListToolbar,
  ManagerStatus,
} from ".";

const TABLE_HEAD: TableHead[] = [
  { id: "id", label: "STT", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "username", label: "Username", align: "center" },
  { id: "phoneContact", label: "Phone Number", align: "center" },
  { id: "birthDay", label: "DoB", align: "center" },
  { id: "ward", label: "Ward", align: "center" },
  { id: "district", label: "District", align: "center" },
  { id: "province", label: "Province", align: "center" },
  { id: "address", label: "Address", align: "center" },
  { id: "status", label: "Status", align: "center" },
  { id: "", label: "Action", align: "center" },
];

export default function ManagersTable() {
  const [pagination, setPagination] = useState<StateNavigation>({
    search: "",
    page: 0,
    pageSize: 10,
  });

  const debounceSearch = useDebounce(pagination.search, 300);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [
      "/managers",
      {
        ...(debounceSearch && { search: debounceSearch }),
        page: pagination.page + 1,
        limit: pagination.pageSize,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<Pagination<Managers>>({ queryKey, signal }),
  });

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
    setPagination({
      search: event.target.value,
      page: 1,
      pageSize: +event.target.value,
    });
  };

  const handleFilterByName = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({
      search: event.target.value,
      page: 1,
      pageSize: 10,
    });
  };

  const handleRefetch = () => {
    refetch();
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
      <ManagerListToolbar
        filterName={pagination.search}
        onFilterName={handleFilterByName}
      />
      <TableContainer sx={{ minWidth: 800 }}>
        {data?.data.result?.data && !isLoading && !isFetching ? (
          <Table>
            <ManagerListHead headLabel={TABLE_HEAD} />
            <TableBody>
              {data?.data.result?.data.map((manager: Managers) => (
                <TableRow hover key={manager.id} tabIndex={-1}>
                  <TableCell align="left">{manager.id}</TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="subtitle2" noWrap>
                        {manager.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">{manager.username}</TableCell>
                  <TableCell align="left">{manager.phoneContact}</TableCell>
                  <TableCell align="left">
                    {fDate(manager.birthDay as string)}
                  </TableCell>
                  <TableCell align="left">{manager.ward}</TableCell>
                  <TableCell align="left">{manager.district}</TableCell>
                  <TableCell align="left">{manager.province}</TableCell>
                  <TableCell align="left">{manager.address}</TableCell>
                  <TableCell align="left">
                    <ManagerStatus status={manager.status} />
                  </TableCell>
                  <TableCell align="left">
                    <ManagerAction
                      id={manager.id}
                      handleRefetch={handleRefetch}
                    />
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
                        {isNotFound && !debounceSearch
                          ? "No Data"
                          : "Not found"}
                      </Typography>

                      {debounceSearch && (
                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{debounceSearch}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      )}
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
