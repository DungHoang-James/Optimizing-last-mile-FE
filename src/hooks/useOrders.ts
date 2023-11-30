import { useContext } from "react";

import { OrderContext } from "@/providers/Orders/OrderContext";

export const useOrders = () => useContext(OrderContext);
