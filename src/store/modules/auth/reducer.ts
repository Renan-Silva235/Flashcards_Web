import * as types from "./types";
import type { AuthState, AuthActionTypes } from "./interface";

const InitialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const authReducer = (
  state = InitialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case types.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    case types.LOGOUT:
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      };
    default:
      return state;
  }
};
