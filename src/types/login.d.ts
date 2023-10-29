export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  jwtToken?: string;
};

export type JWTDecode = {
  sub?: string;
  jti?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
  AuthRole?: ROLE;
  exp?: number;
};

export type ROLE = "ADMIN" | "MANAGER" | null | undefined;
