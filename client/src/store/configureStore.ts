import { configureStore } from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";
import { reducers } from "./reducers";

const middleware = [ReduxThunk];

export const store = configureStore({
  reducer: reducers,
  middleware,
});
