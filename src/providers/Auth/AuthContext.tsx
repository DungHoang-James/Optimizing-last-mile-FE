import type { Reducer } from "react";
import { createContext } from "react";

import storage from "@/utils/storage";

enum Types {
  LOGIN = "LOGIN",
  LOADING = "LOADING",
  LOGOUT = "LOGOUT",
}

const tokenTest = "jwt12345";

export type TDefaultAuthValue = {
  loading: boolean;
  isAuthenticated: boolean;
};

type TAuthContext = {
  state: TDefaultAuthValue;
  dispatch: React.Dispatch<any>;
};

type AuthPayload = {
  [Types.LOADING]: Omit<TDefaultAuthValue, "isAuthenticated">;
  [Types.LOGIN]: TDefaultAuthValue;
  [Types.LOGOUT]: TDefaultAuthValue;
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
  switch (action.type) {
    case Types.LOADING:
      return {
        ...prevState,
        loading: action.payload.loading,
        isAuthenticated: false,
      };
    case Types.LOGIN:
      storage.setToken(tokenTest);
      return { ...prevState, loading: false, isAuthenticated: true };
    case Types.LOGOUT:
      storage.clearToken();
      return { ...prevState, loading: false, isAuthenticated: false };
    default:
      return prevState;
  }
};

export { AuthContext, AuthReducer, DefaultAuthValues, Types };
