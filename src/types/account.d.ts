export interface AccountResponse {
  id?: number;
  phoneNumber?: null;
  email?: null;
  username?: string;
  role?: number;
  status?: number;
  accountProfile?: AccountProfile;
}

export interface AccountProfile {
  name?: string;
  birthDay?: Date;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  phoneContact?: string;
}
