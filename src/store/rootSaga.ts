import { all, fork } from "redux-saga/effects";
import authSaga from "./modules/auth/sagas";
import deckSaga from "./modules/decks/sagas";
import flashcardSaga from "./modules/flashcards/sagas";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(deckSaga), fork(flashcardSaga)]);
}
