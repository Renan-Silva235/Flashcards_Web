import * as types from "./types";
import type {
  LoginRequestInterface,
  LoginSuccessAction,
  LoginRequestAction,
  LoginFailureAction,
} from "./interface";

export const loginRequest = (
  email: string,
  password: string,
): LoginRequestAction => ({
  type: types.LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (
  user: LoginRequestInterface,
): LoginSuccessAction => ({
  type: types.LOGIN_SUCCESS,
  payload: { user },
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: types.LOGIN_FAILURE,
  payload: { error },
});
