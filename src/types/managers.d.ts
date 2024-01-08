import type { Dayjs } from "dayjs";

export type Managers = {
  id: number;
  email: string;
  name: string;
  birthDay: string | Dayjs;
  province: string;
  district: string;
  ward: string;
  address: string;
  phoneContact: string;
  status: number;
};

export type Manager = Omit<Managers, "password">;

export type CreateManagerPayload = Omit<Managers, "id" | "status">;

export type UpdateManagerPayload = Omit<CreateManagerPayload, "password">;
