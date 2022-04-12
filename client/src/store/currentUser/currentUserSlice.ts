import { createSlice } from "@reduxjs/toolkit";

import { initialCurrentUserState } from "./initialState";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialCurrentUserState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});