export interface DriverResponse {
  id?: number;
  phoneNumber?: null;
  email?: null;
  username?: string;
  role: number;
  status: number;
  driverProfile?: DriverProfile | null;
}

export interface DriverProfile {
  name?: string;
  birthDay?: Date;
  avatarUrl?: string;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  phoneContact?: string;
  identificationCardFrontUrl?: string;
  identificationCardBackUrl?: string;
  drivingLicenseFrontUrl?: string;
  drivingLicenseBackUrl?: string;
  vehicleRegistrationCertificateFrontUrl?: string;
  vehicleRegistrationCertificateBackUrl?: string;
}
