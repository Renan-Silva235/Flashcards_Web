import type { Action } from "@reduxjs/toolkit";
import * as types from "./types";

export interface FlashcardResponseApi {
  id?: number;
  word: string;
  translation: string;
  past: string;
  present: string;
  future: string;
  examplePhrase1: string;
  examplePhrase2: string;
  examplePhrase3: string;
}

export interface FlashcardsState {
  flashcards: FlashcardResponseApi[] | null;
  isLoading: boolean;
  error: string | null;
}

export interface FlashcardRequestAction extends Action {
  type: typeof types.FLASHCARDS_REQUEST;
  payload: { deckId: string };
  [key: string]: unknown;
}

export interface FlashcardSuccessAction extends Action {
  type: typeof types.FLASHCARDS_SUCCESS;
  payload: { flashcards: FlashcardResponseApi[] };
  [key: string]: unknown;
}

export interface FlashcardFailureAction extends Action {
  type: typeof types.FLASHCARDS_FAILURE;
  payload: { error: string };
  [key: string]: unknown;
}

export type FlashcardActionType =
  | FlashcardRequestAction
  | FlashcardSuccessAction
  | FlashcardFailureAction;
