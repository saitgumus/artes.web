import * as actionTypes from "../actions/action-types";
import initialState from "./initial-state";

export default function parameterReducer(
  state = initialState.parameterList,
  action
) {
  switch (action.type) {
    case actionTypes.GETPARAMETER:
      return action.payload;
    default:
      return state;
  }
}
