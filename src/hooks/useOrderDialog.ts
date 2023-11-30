import { useContext } from "react";

import { OrderDialogContext } from "@/providers/Orders/OrdersDialog/OrderDialogContext";

export const useOrderDialog = () => useContext(OrderDialogContext);
