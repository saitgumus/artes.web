import * as actionTypes from "../actions/action-types";
import initialState from "./initial-state";

export default function countyReducer(state = initialState.countyList, action) {
  switch (action.type) {
    case actionTypes.GETCOUNTYLIST:
      return action.payload;
    default:
      return state;
  }
}
