import { RootStateOrAny } from "react-redux";

const currentUserSelector = (state: RootStateOrAny) => state.currentUser;

export const currentUserSel = {
  currentUserSelector,
};
