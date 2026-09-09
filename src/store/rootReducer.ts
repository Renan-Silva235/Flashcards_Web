import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./modules/auth/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
