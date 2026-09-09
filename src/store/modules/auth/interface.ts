import * as types from "./types";
import type { Action } from "@reduxjs/toolkit";

export interface LoginRequestInterface {
  email: string;
  password: string;
}

export interface AuthState {
  user: LoginRequestInterface | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Tipagem exata de cada Action
export interface LoginRequestAction extends Action<string> {
  type: typeof types.LOGIN_REQUEST;
  payload: { email: string; password: string };
  [key: string]: unknown;
}

export interface LoginSuccessAction extends Action<string> {
  type: typeof types.LOGIN_SUCCESS;
  payload: { user: LoginRequestInterface };
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
export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;
