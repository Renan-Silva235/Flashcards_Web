import * as types from "./types";
import type {
  LoginSuccessAction,
  LoginRequestAction,
  LoginFailureAction,
  LoginResponseInterface,
  SessionCheckRequestAction,
  SessionCheckDoneAction,
  LogoutAction,
} from "./interface";

export const loginRequest = (
  email: string,
  password: string,
): LoginRequestAction => ({
  type: types.LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (
  user: LoginResponseInterface,
): LoginSuccessAction => ({
  type: types.LOGIN_SUCCESS,
  payload: { user },
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: types.LOGIN_FAILURE,
  payload: { error },
});

export const logout = (): LogoutAction => ({
  type: types.LOGOUT,
});

export const sessionCheckRequest = (): SessionCheckRequestAction => ({
  type: types.SESSION_CHECK_REQUEST,
});

export const sessionCheckDone = (): SessionCheckDoneAction => ({
  type: types.SESSION_CHECK_DONE,
});
