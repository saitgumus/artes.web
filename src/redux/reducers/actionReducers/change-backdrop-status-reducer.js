import * as actionTypes from "../../actions/action-types";
import initialState from "../initial-state";

export default function backdropStatusReducer(
    state = initialState.actionListInfo,
    action
) {
    switch (action.type) {
        case actionTypes.BACKDROP_STATUS:
            return action.payload;
        default:
            return state;
    }
}
