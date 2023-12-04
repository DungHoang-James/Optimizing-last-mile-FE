import type { ChangeEvent, MouseEvent } from "react";
import { createContext } from "react";

import type { OrderResponse, Pagination } from "@/types";

export type TDefaultOrderValue = {
  selected: readonly string[];
  numSelected: number;
};

export type TOrderContext = {
  state: TDefaultOrderValue;
  handleSelectAllClick: (
    event?: ChangeEvent<HTMLInputElement>,
    checked?: boolean,
    data?: Pagination<OrderResponse>
  ) => void;
  handleClickCheckbox: (
    event: MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
  handleSelected: (selected: string[]) => void;
};

export const DefaultOrderValue: TDefaultOrderValue = {
  selected: [],
  numSelected: 0,
};

export const OrderContext = createContext<TOrderContext>({
  state: DefaultOrderValue,
  handleSelectAllClick: () => null,
  handleClickCheckbox: () => null,
  handleSelected: () => null,
});
