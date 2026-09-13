import * as types from "./types";
import type {
  FlashcardResponseApi,
  FlashcardRequestAction,
  FlashcardSuccessAction,
  FlashcardFailureAction,
} from "./interface";

//actions que busca os cards criados por deck
export const flashcardRequestAction = (
  deckId: string,
): FlashcardRequestAction => {
  return {
    type: types.FLASHCARDS_REQUEST,
    payload: { deckId },
  };
};

export const flashcardSuccessAction = (
  flashcards: FlashcardResponseApi[],
): FlashcardSuccessAction => {
  return {
    type: types.FLASHCARDS_SUCCESS,
    payload: { flashcards },
  };
};

export const flashcardFailureAction = (
  error: string,
): FlashcardFailureAction => {
  return {
    type: types.FLASHCARDS_FAILURE,
    payload: { error },
  };
};
