import {CommonTypes} from "../../Types/Common";
import * as actionTypes from "./action-types";
import Cache from "../../Services/Cache";
import {ClaimNames} from "../../Models/OperationClaim";

//#region get actions

/**
 * aksiyon listesi getirilir.
 * @param {string} resourceCode ekran kodu
 */
export function changeActiveResourceCode(resourceCode) {
    let actionKeys = [];
    let claims = Cache.getItem('user-claims');

    // LogMessage("test message");
    switch (resourceCode) {
        // home
        case CommonTypes.Resources.home.resourceCode:
            if (claims.includes(ClaimNames.GET_HOTELS_QUERY))
                actionKeys.push(CommonTypes.ActionKeys.Refresh)
            if (claims.includes(ClaimNames.UPDATE_HOTEL_COMMAND))
                actionKeys.push(CommonTypes.ActionKeys.Edit)
            if (claims.includes(ClaimNames.SAVE_HOTEL_COMMAND))
                actionKeys.push(CommonTypes.ActionKeys.CreateHotel)
            //actionKeys.push.apply(actionKeys, CommonTypes.Resources.home.actionKeys);
            break;
        case CommonTypes.Resources.distributor.resourceCode:
            actionKeys.push.apply(actionKeys, CommonTypes.Resources.distributor.actionKeys);
            break;
        case CommonTypes.Resources.device.resourceCode:
            if (claims.includes(ClaimNames.CREATE_BRASSCO_DEVICE_COMMAND))
                actionKeys.push(CommonTypes.ActionKeys.CreateDevice)
            if (claims.includes(ClaimNames.GET_BRASSCO_DEVICES_QUERY))
                actionKeys.push(CommonTypes.ActionKeys.Refresh)
            //actionKeys.push.apply(actionKeys, CommonTypes.Resources.device.actionKeys);
            break;
        case CommonTypes.Resources.user.resourceCode:
            if (claims.includes(ClaimNames.GET_USERS_QUERY))
                actionKeys.push(CommonTypes.ActionKeys.Refresh)
            if (claims.includes(ClaimNames.UPDATE_USER_COMMAND))
                actionKeys.push(CommonTypes.ActionKeys.UpdateUser)
            if (claims.includes(ClaimNames.CREATE_USER_COMMAND)) {
                actionKeys.push(CommonTypes.ActionKeys.CreateUser)
                actionKeys.push(CommonTypes.ActionKeys.ClaimsUser)
            }
            //actionKeys.push.apply(actionKeys, CommonTypes.Resources.user.actionKeys);
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
        payload: {actionKeyList, resourceCode},
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
