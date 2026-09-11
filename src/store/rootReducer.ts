import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./modules/auth/reducer";
import { deckReducer } from "./modules/decks/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  deck: deckReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
