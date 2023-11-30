import type { RefObject } from "react";
import { createContext } from "react";

export type Driver = {
  id: number | null;
  name: string | null;
};

export type Status = "submit" | null;

export type TDefaultOrderDialogValue = {
  driver: Driver;
  status: Status;
};

export type TOrderDialogContext = {
  state: TDefaultOrderDialogValue;
  formRef: RefObject<HTMLFormElement>;
  handleSetDriver?: (driver: Driver) => void;
  handleSubmit?: () => void;
};

export const DefaultOrderDialogValue: TDefaultOrderDialogValue = {
  driver: { id: null, name: null },
  status: null,
};

export const OrderDialogContext = createContext<TOrderDialogContext>({
  state: DefaultOrderDialogValue,
  formRef: { current: null },
});
