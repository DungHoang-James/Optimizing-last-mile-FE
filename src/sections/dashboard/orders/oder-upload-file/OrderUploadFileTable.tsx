import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useSnackbar } from "notistack";
import type { ChangeEvent, MouseEvent } from "react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

import { queryClient } from "@/lib/react-query";
import { batchOrderMutation } from "@/mutations/order";
import { useRecordStore } from "@/stores/records";
import type { StateNavigation } from "@/types";

import OrderUploadFileTableRow from "./OrderUploadFileTableRow";

export default function OrderUploadFileTable() {
  const [pagination, setPagination] = useState<StateNavigation>({
    page: 0,
    pageSize: 10,
  });
  const [enrichIndex, setEnrichIndex] = useState<number>(0);

  const { enqueueSnackbar } = useSnackbar();

  const { records, addErrorRecords, toggleLoading } = useRecordStore();

  const { mutate } = useMutation({
    mutationFn: batchOrderMutation,
    onSuccess: (data) => {
      toggleLoading();
      if (!data) {
        return;
      }

      if (data) {
        const errorOrders = data.data.result?.filter(
          (errOrder) => !errOrder.isSuccess
        );

        if (Array.isArray(errorOrders) && errorOrders.length > 0) {
          if (Array.isArray(records) && errorOrders.length < records?.length) {
            queryClient.refetchQueries({
              queryKey: ["/orders", { page: 1, limit: 10 }],
            });
            enqueueSnackbar({
              variant: "warning",
              message: "Processing valid order, there are some invalid order",
            });
          } else if (records?.length === errorOrders.length) {
            enqueueSnackbar({
              variant: "error",
              message:
                "Processing failed, please check invalid order in the table",
            });
          }
          return addErrorRecords(errorOrders);
        }

        if (errorOrders?.length === 0) {
          queryClient.refetchQueries({
            queryKey: ["/orders", { page: 1, limit: 10 }],
          });

          enqueueSnackbar({
            variant: "success",
            message: "Processing is complete, you may close the dialog",
          });
        }
      }
    },
  });

  useEffect(() => {
    if (Array.isArray(records) && records.length === enrichIndex) {
      mutate(records);
    }
  }, [records?.length, enrichIndex, records, mutate]);

  const handleEnrich = (index: number) => {
    setEnrichIndex(index);
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
    setPagination((prev) => ({
      ...prev,
      page: 0,
      pageSize: +event.target.value,
    }));
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 440,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align={"center"}>Owner ID</TableCell>
              <TableCell align={"center"}>Driver ID</TableCell>
              <TableCell align={"center"}>Expected Shipping Date</TableCell>
              <TableCell align={"center"}>Shipping Address</TableCell>
              <TableCell align={"center"}>Shipping Address Status</TableCell>
              <TableCell align={"center"}>Error Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(records) &&
              records.map((record, idx) =>
                idx <= enrichIndex && enrichIndex <= records.length ? (
                  <OrderUploadFileTableRow
                    key={record.no}
                    index={idx}
                    enrichIndex={enrichIndex}
                    shippingAddress={record.order.shippingAddress}
                    handleEnrich={handleEnrich}
                  >
                    <TableCell align={"center"}>
                      {record.order.ownerId}
                    </TableCell>
                    <TableCell align={"center"}>
                      {record.order.driverId}
                    </TableCell>
                    <TableCell align={"center"}>
                      {record.order.expectedShippingDate}
                    </TableCell>
                    <TableCell align={"center"}>
                      {record.order.shippingAddress}
                    </TableCell>
                  </OrderUploadFileTableRow>
                ) : null
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={records?.length || -1}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
