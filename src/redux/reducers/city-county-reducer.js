import * as actionTypes from "../actions/action-types";
import initialState from "./initial-state";

export default function cityReducer(state = initialState.cityList, action) {
  switch (action.type) {
    case actionTypes.GETCITYLIST:
      return action.payload;
    default:
      return state;
  }
}
