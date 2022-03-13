import * as actionTypes from "../actions/action-types";
import initialState from "./initial-state";

export default function registerReducer(state = initialState.registerUser, action) {
  switch (action.type) {
    case actionTypes.REGISTER:
      return action.payload;
    default:
      return state;
  }
}
