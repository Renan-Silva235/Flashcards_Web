import * as types from "./types";
import type { Action } from "@reduxjs/toolkit";

export interface DeckResponseInterface {
  id: string;
  name: string;
  language: string;
  category: string;
  cardsCount: number;
  favorite: boolean;
}

export interface DeckState {
  decks: DeckResponseInterface[] | null;
  isLoading: boolean;
  error: string | null;
}

export interface DeckRequestAction extends Action {
  type: typeof types.DECK_REQUEST;
  payload: { userId: string };
  [key: string]: unknown;
}

export interface DeckSuccessAction extends Action<string> {
  type: typeof types.DECK_SUCCESS;
  payload: { deck: DeckResponseInterface[] };
  [key: string]: unknown;
}

export interface DeckFailureAction extends Action<string> {
  type: typeof types.DECK_FAILURE;
  payload: { error: string };
  [key: string]: unknown;
}

export interface DeckFavoriteUpdateAction extends Action<string> {
  type: typeof types.DECK_FAVORITE_UPDATE;
  payload: { deckId: string; favorite: boolean };
  [key: string]: unknown;
}

export type DeckActionTypes =
  | DeckRequestAction
  | DeckSuccessAction
  | DeckFailureAction
  | DeckFavoriteUpdateAction;
