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
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { ListToolbar } from "@/components/list-toolbar";
import { useDebounce } from "@/hooks";
import { fetchWithGet } from "@/lib/request";
import type {
  OrderResponse,
  Pagination,
  StateNavigation,
  TableHead,
} from "@/types";

import { OrderAction, OrderStatus, OrderTableListHead } from ".";

const TABLE_HEAD: TableHead[] = [
  {
    id: "owner",
    label: "Owner",
    align: "center",
    subHead: [
      {
        id: "ownerName",
        label: "Owner Name",
        align: "center",
      },
      {
        id: "ownerPhone",
        label: "Owner Phone",
        align: "center",
      },
    ],
  },
  {
    id: "driver",
    label: "Driver",
    align: "center",
    subHead: [
      {
        id: "driverName",
        label: "Driver Name",
        align: "center",
      },
      {
        id: "driverPhone",
        label: "Driver Phone",
        align: "center",
      },
    ],
  },
  {
    id: "shippingLocation",
    label: "Shipping Address",
    align: "center",
  },
  { id: "orderStatus", label: "Status", align: "center" },
  { id: "action", label: "Action", align: "center" },
];

export default function OrdersTable() {
  const [pagination, setPagination] = useState<StateNavigation>({
    search: "",
    page: 0,
    pageSize: 10,
  });

  const navigate = useNavigate();

  const debounceSearch = useDebounce(pagination.search, 800);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [
      "/orders",
      {
        ...(debounceSearch && { search: debounceSearch }),
        page: pagination.page + 1,
        limit: pagination.pageSize,
      },
    ],
    queryFn: ({ queryKey, signal }) =>
      fetchWithGet<Pagination<OrderResponse>>({ queryKey, signal }),
    select: (data) => data?.data.result,
  });

  const handleRefetch = () => {
    refetch();
  };

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

  const handleViewDetail = (id?: string) => {
    if (!id) return;
    navigate(`/dashboard/orders/${id}`);
  };

  const emptyRows =
    pagination.page > 0
      ? Math.max(
          0,
          (1 + pagination.page) * pagination.pageSize -
            (data?.totalCount as number)
        )
      : 0;

  const isNotFound = data?.totalCount === 0;

  return (
    <>
      <ListToolbar
        filterName={pagination.search}
        onFilterName={handleFilterByName}
      />
      <TableContainer sx={{ minWidth: 800 }}>
        {data?.data && !isLoading && !isFetching ? (
          <Table>
            <OrderTableListHead headLabel={TABLE_HEAD} />
            <TableBody>
              {data?.data.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                  tabIndex={-1}
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleViewDetail(order.id)}
                >
                  <TableCell align="center">{order.owner?.name}</TableCell>
                  <TableCell align="center">
                    {order.owner?.phoneContact}
                  </TableCell>
                  <TableCell align="center">{order.driver?.name}</TableCell>
                  <TableCell align="center">
                    {order.driver?.phoneContact}
                  </TableCell>
                  <TableCell align="center">{order.shippingAddress}</TableCell>
                  <TableCell align="center">
                    <OrderStatus status={order.currentOrderStatus} />
                  </TableCell>
                  <TableCell align="center">
                    <OrderAction
                      id={order.id}
                      status={order.currentOrderStatus}
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
        count={data?.totalCount || -1}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
