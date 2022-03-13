import * as actionTypes from "../actions/action-types";
import initialState from "./initial-state";

export default function changeLoginStatusReducer(
  state = initialState.jwtObject,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_LOGIN_STATUS:
      return action.payload;
    default:
      return state;
  }
}
