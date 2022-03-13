import * as actionTypes from "./action-types";

export function statusMessageSuccess(messageObject) {
  return {
    type: actionTypes.SHOW_STATUS_MESSAGE,
    payload: messageObject,
  };
}

/**
 *
 * @param {string} message
 * @param {CommonTypes.MessageTypes} type info,error,success
 */
export function showStatusMessage(message, type) {
  return function (dispatch) {
    let messageObject = {
      messageType: type,
      message: message,
    };
    return dispatch(statusMessageSuccess(messageObject));
  };
}
