import type { AxiosResponse } from "axios";

import { request } from "@/lib/request";
import { OrderFormValue } from "@/sections/dashboard/orders/OrderForm/OrderForm";
import type { OrderPayload, OrderResponse, Response } from "@/types";

export const createOrderMutation = async (
  data: OrderFormValue
): Promise<AxiosResponse<Response<OrderResponse>, any> | undefined> => {
  const transformData = transformOrder(data);

  return request({
    url: "/orders",
    method: "POST",
    data: transformData,
  });
};

export const updateOrderMutation = async (
  data: OrderFormValue,
  id: string
): Promise<AxiosResponse<Response<OrderResponse>, any> | undefined> => {
  const transformData = transformOrder(data);

  return request({
    url: `/orders/${id}`,
    method: "PUT",
    data: transformData,
  });
};

export const deleteOrderMutation = async (
  id: string
): Promise<AxiosResponse<Response<OrderResponse>, any> | undefined> => {
  return request({
    url: `/orders/${id}`,
    method: "DELETE",
  });
};

const transformOrder = (value: OrderFormValue): OrderPayload => {
  return {
    ownerId: value.ownerId.id,
    ...(value.driverId?.id && { driverId: value.driverId?.id }),
    recipientName: value.recipientName,
    recipientPhoneNumber: value.recipientPhoneNumber,
    shippingProvince: value.shippingAddress.compound.province,
    shippingDistrict: value.shippingAddress.compound.district,
    shippingWard: value.shippingAddress.compound.commune,
    shippingAddress: value.shippingAddress.description,
    lat: value.lat,
    lng: value.lng,
    expectedShippingDate: value.expectedShippingDate,
    senderName: value.senderName,
    senderPhoneNumber: value.senderPhoneNumber,
    note: value.note || "",
  };
};
