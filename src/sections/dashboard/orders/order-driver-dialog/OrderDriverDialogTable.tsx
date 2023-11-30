import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useOrders } from "@/hooks";

import OrderDriverDialogTableBody from "./OrderDriverDialogTableBody";

export default function OrderDriverDialogTable() {
  const { state } = useOrders();

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
              <TableCell>Order ID</TableCell>
              <TableCell>Owner Name</TableCell>
              <TableCell>Driver Name</TableCell>
              <TableCell align={"center"}>Assign Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.selected.map((selectId) => (
              <OrderDriverDialogTableBody key={selectId} selectId={selectId} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
