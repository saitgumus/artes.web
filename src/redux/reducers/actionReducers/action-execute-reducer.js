import * as actionTypes from "../../actions/action-types";
import initialState from "../initial-state";

export default function actionExecuteReducer(
  state = initialState.executedAction,
  action
) {
  switch (action.type) {
    case actionTypes.EXECUTE_ACTION:
      return action.payload;
    default:
      return state;
  }
}
