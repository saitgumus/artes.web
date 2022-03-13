import * as actionTypes from "./action-types";

export function addBlockSuccess(blockList) {
  return {
    type: actionTypes.SAVE_NEW_BLOCK,
    payload: blockList,
  };
}

export function saveBlock(blockList) {
  return function (dispatch) {
    dispatch(addBlockSuccess(blockList));
  };
}
