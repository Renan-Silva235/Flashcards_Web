import * as types from "./types";
import type {
  DeckResponseInterface,
  DeckRequestAction,
  DeckSuccessAction,
  DeckFailureAction,
} from "./interface";

// Actions que busca os decks criados.
export const deckRequestAction = (userId: number): DeckRequestAction => {
  return {
    type: types.DECK_REQUEST,
    payload: { userId },
  };
};

export const deckSuccessAction = (
  deck: DeckResponseInterface[],
): DeckSuccessAction => {
  return {
    type: types.DECK_SUCCESS,
    payload: { deck },
  };
};

export const deckFailureAction = (error: string): DeckFailureAction => {
  return {
    type: types.DECK_FAILURE,
    payload: { error },
  };
};
