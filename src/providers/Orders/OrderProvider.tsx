import type { ChangeEvent, MouseEvent, PropsWithChildren } from "react";
import { useCallback, useMemo, useState } from "react";

import type { OrderResponse, Pagination } from "@/types";

import type { TOrderContext } from "./OrderContext";
import { OrderContext } from "./OrderContext";

export default function OrderProvider({ children }: PropsWithChildren) {
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleSelectAllClick = useCallback(
    (
      event?: ChangeEvent<HTMLInputElement>,
      _?: boolean,
      data?: Pagination<OrderResponse>
    ) => {
      if (
        event?.target.checked &&
        data &&
        data.data &&
        data?.data?.length > 0
      ) {
        const newSelected = data.data
          .filter(
            (n) =>
              n.id && (n.currentOrderStatus === 0 || n.currentOrderStatus === 1)
          )
          .map((item) => item.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    []
  );

  const handleClickCheckbox = useCallback(
    (event: MouseEvent<HTMLButtonElement>, id: string) => {
      event.stopPropagation();
      const selectedIndex = selected.indexOf(id);
      let newSelected: readonly string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    },
    [selected]
  );

  const handleSelected = useCallback((selected: string[]) => {
    setSelected(selected);
  }, []);

  const value: TOrderContext = useMemo(
    () => ({
      state: { selected, numSelected: selected.length },
      handleSelectAllClick,
      handleClickCheckbox,
      handleSelected,
    }),
    [handleClickCheckbox, handleSelectAllClick, handleSelected, selected]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}
