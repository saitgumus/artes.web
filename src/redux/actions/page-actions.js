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
    //apartman tanımlama
    case CommonTypes.Resources.defineSiteApartment.resourceCode:
      actionKeys.push.apply(actionKeys, [CommonTypes.ActionKeys.Save]);
      break;
    //üye ekle
    case CommonTypes.Resources.defineMember.resourceCode:
      actionKeys.push.apply(
        actionKeys,
        CommonTypes.Resources.defineMember.actionKeys
      );
      break;
    //üye listele
    case CommonTypes.Resources.memberList.resourceCode:
      actionKeys.push.apply(
        actionKeys,
        CommonTypes.Resources.memberList.actionKeys
      );
      break;
    // gelen kutusu
    case CommonTypes.Resources.userInbox.resourceCode:
      actionKeys.push.apply(
        actionKeys,
        CommonTypes.Resources.userInbox.actionKeys
      );
      break;
    // anket tanımlama
    case CommonTypes.Resources.VoteDefine.resourceCode:
      actionKeys.push.apply(
        actionKeys,
        CommonTypes.Resources.VoteDefine.actionKeys
      );
      break;
    // anket işlemler ve sonuçlar
    case CommonTypes.Resources.VotingAndResult.resourceCode:
      actionKeys.push.apply(
        actionKeys,
        CommonTypes.Resources.VotingAndResult.actionKeys
      );
      break;
    // masraf giriş
    case CommonTypes.Resources.ExpenseEntry.resourceCode:
      actionKeys.push.apply(
        actionKeys,
        CommonTypes.Resources.ExpenseEntry.actionKeys
      );
      break;
    // masraf listele
    case CommonTypes.Resources.ExpenseList.resourceCode:
      actionKeys.push.apply(
        actionKeys,
        CommonTypes.Resources.ExpenseList.actionKeys
      );
      break;
    // ihale kaydı
    case CommonTypes.Resources.TenderDefining.resourceCode:
      actionKeys.push.apply(
        actionKeys,
        CommonTypes.Resources.TenderDefining.actionKeys
      );
      break;
      // ihale listeleme
    case CommonTypes.Resources.TenderListing.resourceCode:
      actionKeys.push.apply(
        actionKeys,
        CommonTypes.Resources.TenderListing.actionKeys
      );
      break;
      // aidat ödeme
    case CommonTypes.Resources.DuesPayment.resourceCode:
      actionKeys.push.apply(
        actionKeys,
        CommonTypes.Resources.DuesPayment.actionKeys
      );
      break;
      // aidat listeleme
    case CommonTypes.Resources.DuesListing.resourceCode:
      actionKeys.push.apply(
          actionKeys,
          CommonTypes.Resources.DuesListing.actionKeys
      );
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
