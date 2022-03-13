import * as actionTypes from "../../actions/action-types";
import initialState from "../initial-state";

export default function actionListReducer(
  state = initialState.actionListInfo,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_ACTION_LIST:
      return action.payload;
    default:
      return state;
  }
}
