import jwtDecode from "jwt-decode";
import type { Reducer } from "react";
import { createContext } from "react";

import type { JWTDecode, ROLE } from "@/types";
import storage from "@/utils/storage";

enum Types {
  LOGIN = "LOGIN",
  LOADING = "LOADING",
  LOGOUT = "LOGOUT",
}

export type TDefaultAuthValue = {
  loading: boolean;
  isAuthenticated: boolean;
  jwtToken?: string;
  role?: ROLE;
  id?: string;
};

type TAuthContext = {
  state: TDefaultAuthValue;
  dispatch: React.Dispatch<any>;
};

type AuthPayload = {
  [Types.LOADING]: Omit<
    TDefaultAuthValue,
    "isAuthenticated" | "jwtToken" | "role"
  >;
  [Types.LOGIN]: TDefaultAuthValue;
  [Types.LOGOUT]: Omit<
    TDefaultAuthValue,
    "isAuthenticated" | "jwtToken" | "role"
  >;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

const DefaultAuthValues: TDefaultAuthValue = {
  loading: true,
  isAuthenticated: false,
};

const AuthContext = createContext<TAuthContext>({
  state: DefaultAuthValues,
  dispatch: () => null,
});

const AuthReducer: Reducer<TDefaultAuthValue, AuthActions> = (
  prevState,
  action
): TDefaultAuthValue => {
  let decodeJWT: JWTDecode | null = null;
  switch (action.type) {
    case Types.LOADING:
      return {
        ...prevState,
        loading: action.payload.loading,
        isAuthenticated: false,
      };
    case Types.LOGIN:
      if (action.payload.jwtToken && !storage.getToken()) {
        storage.setToken(action.payload.jwtToken);
      }

      if (action.payload.jwtToken) {
        decodeJWT = jwtDecode(action.payload.jwtToken);
      }

      return {
        ...prevState,
        loading: false,
        isAuthenticated: true,
        jwtToken: action?.payload?.jwtToken,
        role: decodeJWT?.AuthRole,
        id: decodeJWT?.sub,
      };
    case Types.LOGOUT:
      storage.clearToken();
      return { loading: false, isAuthenticated: false };
    default:
      return prevState;
  }
};

export { AuthContext, AuthReducer, DefaultAuthValues, Types };
