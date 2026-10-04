import * as types from "./types";
import type {
  DeckResponseInterface,
  DeckRequestAction,
  DeckSuccessAction,
  DeckFailureAction,
  DeckFavoriteUpdateAction,
} from "./interface";

// Actions que busca os decks criados.
export const deckRequestAction = (userId: string): DeckRequestAction => {
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

// Atualiza o favorito de um deck direto no store, sem recarregar a lista
export const deckFavoriteUpdateAction = (
  deckId: string,
  favorite: boolean,
): DeckFavoriteUpdateAction => {
  return {
    type: types.DECK_FAVORITE_UPDATE,
    payload: { deckId, favorite },
  };
};
