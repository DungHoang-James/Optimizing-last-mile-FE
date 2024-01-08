export type RecordState = {
  no: number;
  order: {
    ownerId: string;
    driverId: string;
    senderName: string;
    senderPhoneNumber: string;
    recipientName: string;
    recipientPhoneNumber: string;
    expectedShippingDate: string;
    note: string;
    shippingAddress: string;
    shippingProvince?: string;
    shippingDistrict?: string;
    shippingWard?: string;
    lat?: number;
    lng?: number;
  };
};

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
  id: string;
  owner: Driver;
  driver: Driver;
  creatorId: number;
  shippingProvince: string;
  shippingDistrict: string;
  shippingWard: string;
  shippingAddress: string;
  expectedShippingDate: Date;
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

export type OrderDriverPayload = {
  driverId: number;
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
  note: string | null;
};

export type OrderBatchPayload = {
  no: number;
  order: {
    ownerId: number;
    driverId: number;
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
};

export type OrderBatchResponse = {
  no: number;
  orderId: string | null;
  isSuccess: boolean;
  error: {
    errorCode: string | null;
    errorMessage: string | null;
  };
};
