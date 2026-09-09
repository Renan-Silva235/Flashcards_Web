import { call, takeLatest, put, all } from "redux-saga/effects";
import { loginFailure, loginSuccess } from "./actions";
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

    yield put(loginSuccess(response.data));
    toast.success("Login realizado com sucesso.");
    return;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      yield put(loginFailure(error.response?.data?.message));
      toast.error(error.response?.data.message);
      return;
    }

    yield put(loginFailure("Erro desconhecido"));
  }
}

function handleLogout() {
  localStorage.removeItem("access_token");
}

export default function* authSaga() {
  yield all([
    takeLatest(types.LOGIN_REQUEST, handleLogin),
    takeLatest(types.LOGOUT, handleLogout),
  ]);
}
