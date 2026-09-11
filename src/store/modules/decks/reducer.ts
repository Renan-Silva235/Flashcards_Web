import * as types from "./types";
import type { DeckState, DeckActionTypes } from "./interface";

const InitialState: DeckState = {
  decks: null,
  isLoading: false,
  error: null,
};

export const deckReducer = (
  state = InitialState,
  action: DeckActionTypes,
): DeckState => {
  switch (action.type) {
    case types.DECK_REQUEST:
      return { ...state, isLoading: true, error: null };
    case types.DECK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        decks: action.payload.deck,
        error: null,
      };
    case types.DECK_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};
