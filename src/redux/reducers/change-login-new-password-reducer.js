import * as actionTypes from "../actions/action-types";
import initialState from "./initial-state";

export default function changeLoginToNewPasswordReducer(
  state = initialState.loginUser,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_LOGIN_NEW_PASSWORD:
      return action.payload;
    default:
      return state;
  }
}
