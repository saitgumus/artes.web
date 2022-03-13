import * as actionTypes from "../actions/action-types";
import initialState from "./initial-state";

export default function loginReducer(state = initialState.loginUser, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return action.payload;
    default:
      return state;
  }
}
