import * as types from "./types";
import type { Action } from "@reduxjs/toolkit";

export interface LoginResponseInterface {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: LoginResponseInterface | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  // false enquanto o app ainda não perguntou ao backend se o cookie de login é válido
  isSessionChecked: boolean;
}

// Tipagem exata de cada Action
export interface LoginRequestAction extends Action<string> {
  type: typeof types.LOGIN_REQUEST;
  payload: { email: string; password: string };
  [key: string]: unknown;
}

export interface LoginSuccessAction extends Action<string> {
  type: typeof types.LOGIN_SUCCESS;
  payload: { user: LoginResponseInterface };
  [key: string]: unknown;
}

export interface LoginFailureAction extends Action<string> {
  type: typeof types.LOGIN_FAILURE;
  payload: { error: string };
  [key: string]: unknown;
}

export interface LogoutAction extends Action<string> {
  type: typeof types.LOGOUT;
  [key: string]: unknown;
}

// União de todas as ações possíveis do módulo
export interface SessionCheckRequestAction extends Action<string> {
  type: typeof types.SESSION_CHECK_REQUEST;
  [key: string]: unknown;
}

export interface SessionCheckDoneAction extends Action<string> {
  type: typeof types.SESSION_CHECK_DONE;
  [key: string]: unknown;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | SessionCheckRequestAction
  | SessionCheckDoneAction;
