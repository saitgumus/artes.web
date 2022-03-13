import * as actionTypes from "../actions/action-types";
import initialState from "./initial-state";

export default function showMessageReducer(
  state = initialState.messageObject,
  action
) {
  switch (action.type) {
    case actionTypes.SHOW_STATUS_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}
