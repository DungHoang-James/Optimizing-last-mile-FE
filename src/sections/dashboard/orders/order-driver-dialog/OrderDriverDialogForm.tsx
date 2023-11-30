import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import type { InferType } from "yup";
import { number, object, string } from "yup";

import Form from "@/components/form";
import { useOrderDialog } from "@/hooks";

import OrderDropdown from "../order-form/OrderDropdown";

export type OrderDriverFormValue = InferType<typeof orderFormSchema>;

const orderFormSchema = object({
  driverId: object({
    id: number().required(),
    name: string().required(),
  })
    .test(
      "driverId",
      "Driver is required",
      (owner) =>
        Object.keys(owner).length > 0 ||
        Boolean((owner.id === 0 || owner.id) && owner.name)
    )
    .nonNullable()
    .required("Driver is required"),
});

const ROLE = 2;

export default function OrderDriverDialogForm() {
  const { formRef, handleSetDriver } = useOrderDialog();
  const methods = useForm({
    defaultValues: {
      driverId: {},
    },
    resolver: yupResolver(orderFormSchema),
  });

  const onSubmit = ({ driverId }: OrderDriverFormValue) => {
    handleSetDriver && handleSetDriver(driverId);
  };

  return (
    <FormProvider {...methods}>
      <Form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
        <OrderDropdown
          inputLabel={"Diver Name"}
          placeholder={"Enter Driver Name"}
          role={ROLE}
          name={"driverId"}
          disabled={false}
        />
      </Form>
    </FormProvider>
  );
}
