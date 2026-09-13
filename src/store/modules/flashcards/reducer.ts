import * as types from "./types";
import type { FlashcardsState, FlashcardActionType } from "./interface";

const InitialState: FlashcardsState = {
  flashcards: null,
  isLoading: false,
  error: null,
};

export const flashcardReducer = (
  state = InitialState,
  action: FlashcardActionType,
): FlashcardsState => {
  switch (action.type) {
    case types.FLASHCARDS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case types.FLASHCARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        flashcards: action.payload.flashcards,
      };
    case types.FLASHCARDS_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};
