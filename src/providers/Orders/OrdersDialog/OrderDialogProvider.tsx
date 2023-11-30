import type { PropsWithChildren } from "react";
import { useCallback, useMemo, useRef, useState } from "react";

import { OrderDialogContext } from "./OrderDialogContext";
import type { Driver, TOrderDialogContext, Status } from "./OrderDialogContext";

export default function OrderDialogProvider({ children }: PropsWithChildren) {
  const formRef = useRef<HTMLFormElement>(null);

  const [driver, setDriver] = useState<Driver>({
    id: null,
    name: null,
  });

  const [status, setStatus] = useState<Status>(null);

  const handleSetDriver = useCallback((driver: Driver) => {
    setDriver(driver);
  }, []);

  const handleSubmit = useCallback(() => {
    formRef.current?.requestSubmit();
    setStatus("submit");
  }, []);

  const value: TOrderDialogContext = useMemo(
    () => ({
      state: { driver, status },
      formRef,
      handleSetDriver,
      handleSubmit,
    }),
    [driver, status, handleSetDriver, handleSubmit]
  );

  return (
    <OrderDialogContext.Provider value={value}>
      {children}
    </OrderDialogContext.Provider>
  );
}
