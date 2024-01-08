import { create } from "zustand";

import type { OrderBatchResponse, RecordState } from "@/types";

type RecordsStore = {
  loadingBatch: boolean;
  records: RecordState[] | null;
  errorRecords: OrderBatchResponse[] | null;
  toggleLoading: () => void;
  addRecords: (records: RecordState[] | null) => void;
  enrichGeometry: (index: number, lat: number, lng: number) => void;
  enrichAddress: (
    index: number,
    shippingProvince: string,
    shippingDistrict: string,
    shippingWard: string
  ) => void;
  addErrorRecords: (errorRecords: OrderBatchResponse[]) => void;
};

export const useRecordStore = create<RecordsStore>((set, get) => ({
  loadingBatch: false,
  records: null,
  errorRecords: null,
  toggleLoading: () => {
    set(() => ({
      loadingBatch: !get().loadingBatch,
    }));
  },
  addRecords: (_records) => {
    set(() => ({
      records: Array.isArray(_records) ? [..._records] : _records,
    }));
  },
  enrichGeometry: (index, lat, lng) => {
    const newRecords = [...(get().records as RecordState[])];
    newRecords[index].order.lat = lat;
    newRecords[index].order.lng = lng;
    set(() => ({
      records: [...newRecords],
    }));
  },
  enrichAddress: (index, shippingProvince, shippingDistrict, shippingWard) => {
    const newRecords = [...(get().records as RecordState[])];
    newRecords[index].order.shippingProvince = shippingProvince;
    newRecords[index].order.shippingDistrict = shippingDistrict;
    newRecords[index].order.shippingWard = shippingWard;

    set(() => ({
      records: [...newRecords],
    }));
  },
  addErrorRecords: (errorRecords) => {
    set(() => ({
      errorRecords,
    }));
  },
}));
