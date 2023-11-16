export type OrderPayload = {
  ownerId: number;
  driverId?: number;
  recipientName: string;
  recipientPhoneNumber: string;
  shippingProvince: string;
  shippingDistrict: string;
  shippingWard: string;
  shippingAddress: string;
  lat: number;
  lng: number;
  expectedShippingDate: string;
  senderName: string;
  senderPhoneNumber: string;
  note: string;
};

export type OrderResponse = {
  id?: string;
  owner?: Driver;
  driver?: Driver;
  creatorId?: number;
  shippingProvince?: string;
  shippingDistrict?: string;
  shippingWard?: string;
  shippingAddress?: string;
  expectedShippingDate?: Date;
  currentOrderStatus: number;
};

export type Driver = {
  id?: number;
  role?: number;
  name?: string;
  phoneContact?: string;
};

export type OrderDetailResponse = {
  id: string;
  owner: PersonDetailResponse;
  driver?: Partial<PersonDetailResponse>;
  recipientName: string;
  recipientPhoneNumber: string;
  shippingProvince: string;
  shippingDistrict: string;
  shippingWard: string;
  shippingAddress: string;
  lat: number;
  lng: number;
  expectedShippingDate: string;
  pickupDate: null;
  dropoffDate: null;
  senderName: string;
  senderPhoneNumber: string;
  note?: string;
};

export type PersonDetailResponse = {
  id: number;
  role: number;
  name: string;
  phoneContact: string;
};
