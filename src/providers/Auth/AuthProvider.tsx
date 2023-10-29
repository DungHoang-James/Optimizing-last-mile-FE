import type { PropsWithChildren } from "react";
import { useEffect, useReducer } from "react";

import storage from "@/utils/storage";

import {
  AuthContext,
  AuthReducer,
  DefaultAuthValues,
  Types,
} from "./AuthContext";

function AuthProvider({ children }: PropsWithChildren): JSX.Element {
  const [state, dispatch] = useReducer(AuthReducer, DefaultAuthValues);

  useEffect(() => {
    const token = storage.getToken();
    if (!token) {
      return dispatch({
        type: Types.LOADING,
        payload: {
          loading: false,
        },
      });
    }

    return dispatch({
      type: Types.LOGIN,
      payload: {
        loading: false,
        isAuthenticated: true,
        jwtToken: token,
      },
    });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
