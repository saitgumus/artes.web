import * as actionTypes from "../actions/action-types";
import initialState from "./initial-state";

export default function changeSelectedCityReducer(
  state = initialState.selectedCityId,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_SELECTED_CITY_ID:
      return action.payload;
    default:
      return state;
  }
}
