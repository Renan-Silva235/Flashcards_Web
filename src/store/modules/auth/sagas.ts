import { call, takeLatest, put, all } from "redux-saga/effects";
import { loginFailure, loginSuccess, sessionCheckDone } from "./actions";
import * as types from "./types";
import type { LoginRequestAction } from "./interface";
import api from "../../../config/api";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { toast } from "react-toastify";

function* handleLogin(action: LoginRequestAction) {
  try {
    const response: AxiosResponse = yield call(api.post, "/auth/login", {
      email: action.payload.email,
      password: action.payload.password,
    });
    yield put(loginSuccess(response.data.user));
    toast.success("Login realizado com sucesso.");
    return;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Erro da api: ", error.response?.data.message);
      yield put(loginFailure(error.response?.data?.message));
      toast.error(error.response?.data.message);
      return;
    }

    yield put(loginFailure("Erro desconhecido"));
  }
}

// Ao abrir/recarregar o app: se o cookie de login ainda for válido, o backend devolve
// o usuário e a sessão é restaurada sem precisar logar de novo
function* handleSessionCheck() {
  try {
    const response: AxiosResponse = yield call(api.get, "/auth/me");
    yield put(loginSuccess(response.data));
  } catch {
    // 401 = não está logado (ou o token expirou): segue deslogado, sem mostrar erro
  } finally {
    yield put(sessionCheckDone());
  }
}

function* handleLogout() {
  localStorage.removeItem("access_token");
  try {
    // Pede ao backend para apagar o cookie HttpOnly com o JWT
    yield call(api.post, "/auth/logout");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao encerrar sessão: ", error.response?.data?.message);
    }
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(types.LOGIN_REQUEST, handleLogin),
    takeLatest(types.LOGOUT, handleLogout),
    takeLatest(types.SESSION_CHECK_REQUEST, handleSessionCheck),
  ]);
}
