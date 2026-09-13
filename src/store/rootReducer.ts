import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./modules/auth/reducer";
import { deckReducer } from "./modules/decks/reducer";
import { flashcardReducer } from "./modules/flashcards/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  deck: deckReducer,
  flashcard: flashcardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
