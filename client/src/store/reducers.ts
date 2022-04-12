import { combineReducers } from "@reduxjs/toolkit";

import currentUserSlice from "./currentUser";


export const reducers = combineReducers({
  currentUser: currentUserSlice.reducer,
});
