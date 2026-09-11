import { call, takeLatest, put, all } from "redux-saga/effects";
import * as types from "./types";
import axios, { type AxiosResponse } from "axios";
import api from "../../../config/api";
import type { DeckRequestAction } from "./interface";
import { deckSuccessAction, deckFailureAction } from "./actions";

function* handleDeckRequest(action: DeckRequestAction) {
  try {
    const { userId } = action.payload;
    const response: AxiosResponse = yield call(api.get, `decks/user/${userId}`);
    yield put(deckSuccessAction(response.data));
    return;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      yield put(deckFailureAction(error.response?.data.message));
      return;
    }

    yield put(deckFailureAction("Erro inesperado internamente."));
  }
}

export default function* deckSaga() {
  yield all([takeLatest(types.DECK_REQUEST, handleDeckRequest)]);
}
