import { Stack } from "@mui/material";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Form from "@/components/form";

import { createOrderMutation, updateOrderMutation } from "@/mutations/order";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { InferType, number, object, string } from "yup";
import { OrderAddress, OrderInformation } from "..";

export type OrderFormValue = InferType<typeof orderFormSchema>;
type Props = {
  status: "new" | "update";
  id?: string;
  defaultValues?: OrderFormValue;
};

const orderFormSchema = object({
  ownerId: object({
    id: number().required(),
    name: string().required(),
  })
    .test(
      "ownerId",
      "Owner Id is required",
      (owner) =>
        Object.keys(owner).length > 0 ||
        Boolean((owner.id === 0 || owner.id) && owner.name)
    )
    .nonNullable()
    .required("Owner Id is required"),
  driverId: object({
    id: number().nullable(),
    name: string().nullable(),
  })
    .test("driverId", "Driver Id is required", (driver) =>
      Boolean(
        (!driver.id && !driver.name) ||
          ((driver.id === 0 || driver.id) && driver.name)
      )
    )
    .nullable(),
  recipientName: string().nullable().required("Recipient Name is required"),
  recipientPhoneNumber: string()
    .nullable()
    .required("Recipient Phone Number is required"),
  shippingAddress: object({
    compound: object({
      province: string().required(),
      district: string().required(),
      commune: string().required(),
    }),
    description: string().required(),
    place_id: string().nullable(),
  })
    .test(
      "shippingAddress",
      "Shipping Address is required",
      (shippingAddress) =>
        Boolean(shippingAddress.compound && shippingAddress.description)
    )
    .nonNullable()
    .required("Shipping Address is required"),
  lat: number().typeError("Lat is required").required("Lat is required"),
  lng: number().typeError("Lng is required").required("Lng is required"),
  expectedShippingDate: string()
    .nullable()
    .required("Expected Shipping Date is required"),
  senderName: string().required("Sender Name is required"),
  senderPhoneNumber: string().required("Sender Phone Number is required"),
  note: string().nullable(),
});

export default function OrderForm({ status, id, defaultValues }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const methods = useForm<OrderFormValue>({
    defaultValues:
      status === "new" && !defaultValues
        ? {
            ownerId: {},
            driverId: { id: null, name: null },
            recipientName: "",
            recipientPhoneNumber: "",
            shippingAddress: {},
            lat: undefined,
            lng: undefined,
            expectedShippingDate: undefined,
            senderName: "",
            senderPhoneNumber: "",
            note: null,
          }
        : defaultValues,
    resolver: yupResolver<OrderFormValue>(orderFormSchema),
  });

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: OrderFormValue) =>
      id && status === "update"
        ? updateOrderMutation(data, id)
        : createOrderMutation(data),
    onSuccess: () => {
      navigate("/dashboard/orders");
    },
  });

  const onSubmit = (data: OrderFormValue) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <Form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <OrderInformation disabled={isLoading} />
          <OrderAddress disabled={isLoading} />
        </Stack>
        <Stack mt={3} direction={"row"} spacing={1} justifyContent={"flex-end"}>
          <LoadingButton
            type={"reset"}
            size={"medium"}
            variant={"outlined"}
            color={"error"}
            disabled={isLoading}
          >
            Reset
          </LoadingButton>
          <LoadingButton
            type={"submit"}
            size={"medium"}
            variant={"contained"}
            loading={isLoading}
          >
            Submit
          </LoadingButton>
        </Stack>
      </Form>
    </FormProvider>
  );
}
