import { CommonTypes } from "../../Types/Common";
import * as actionTypes from "./action-types";

//#region get actions

/**
 * aksiyon listesi getirilir.
 * @param {string} resourceCode ekran kodu
 */
export function changeActiveResourceCode(resourceCode) {
  let actionKeys = [];
  // LogMessage("test message");
  switch (resourceCode) {
    // home
    case CommonTypes.Resources.home.resourceCode:
      actionKeys.push.apply(actionKeys, CommonTypes.Resources.home.actionKeys);
      break;
    case CommonTypes.Resources.distributor.resourceCode:
      actionKeys.push.apply(actionKeys, CommonTypes.Resources.distributor.actionKeys);
      break;
      case CommonTypes.Resources.device.resourceCode:
        actionKeys.push.apply(actionKeys, CommonTypes.Resources.device.actionKeys);
        break;
    default:
      break;
  }

  return function (dispatch) {
    dispatch(GetActionListSuccess(actionKeys, resourceCode));
  };
}

export function GetActionListSuccess(actionKeyList, resourceCode) {
  return {
    type: actionTypes.CHANGE_ACTION_LIST,
    payload: { actionKeyList, resourceCode },
  };
}

//#endregion

//#region execute action

/**
 * on execute action
 * @param {func} onExecute (key)
 */
export function executeCommand(onExecute) {
  return function (dispatch) {
    dispatch(executeSuccess(onExecute));
  };
}

export function executeSuccess(onExecute) {
  return {
    type: actionTypes.EXECUTE_ACTION,
    payload: {
      onExecute,
    },
  };
}

//#endregion

//#region backdrop

export function changeBackDropStatus(status) {
  return function (dispatch) {
    return dispatch(changeBackDropSuccess(status));
  };
}

export function changeBackDropSuccess(status) {
  return {
    type: actionTypes.BACKDROP_STATUS,
    payload: status,
  };
}
//#endregion
