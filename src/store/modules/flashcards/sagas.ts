import { call, takeLatest, put, all } from "redux-saga/effects";
import * as types from "./types";
import axios, { type AxiosResponse } from "axios";
import api from "../../../config/api";
import type { FlashcardRequestAction } from "./interface";
import { flashcardSuccessAction, flashcardFailureAction } from "./actions";

function* handleFlashcardRequest(action: FlashcardRequestAction) {
  try {
    const { deckId } = action.payload;
    const response: AxiosResponse = yield call(
      api.get,
      `flashcards/deck/${deckId}`,
    );
    yield put(flashcardSuccessAction(response.data));
    return;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      yield put(flashcardFailureAction(error.response?.data?.message));
      return;
    }

    yield put(flashcardFailureAction("Erro inesperado internamente."));
  }
}

export default function* flashcardSaga() {
  yield all([takeLatest(types.FLASHCARDS_REQUEST, handleFlashcardRequest)]);
}
