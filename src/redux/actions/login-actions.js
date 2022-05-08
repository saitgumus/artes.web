import * as actionTypes from "./action-types";
import User from "../../Models/User";
import { LoginUser } from "../../Services/UserService";
import { ShowStatusError } from "../../Core/Helper";

//import Log from "../../Services/Log";

/**
 *
 * @param {User}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function LoginSuccess(userContract) {
  return {
    type: actionTypes.LOGIN,
    payload: userContract,
  };
}

export function ChangeLoginStatusSuccess(
  token,
  expiration,
  isSuccess,
  isNewPassword = false
) {
  return {
    type: actionTypes.CHANGE_LOGIN_STATUS,
    payload: {
      token,
      expiration,
      isSuccess,
      isNewPassword,
    },
  };
}

export function ChangeLoginStatus(jwtObject) {
  return function (dispatch) {
    dispatch(
      ChangeLoginStatusSuccess(
        jwtObject.token,
        jwtObject.expiration,
        jwtObject.isSuccess,
        jwtObject.isNewPassword
      )
    );
  };
}

export function ChangeLoginToNewPasswordSuccess(email) {
  return {
    type: actionTypes.CHANGE_LOGIN_NEW_PASSWORD,
    payload: {
      email,
    },
  };
}
export function ChangeLoginToNewPassword(email) {
  return function (dispatch) {
    dispatch(ChangeLoginToNewPasswordSuccess(email));
  };
}

/**
 * kullanıcı login olur
 * @param {User} user login kullanıcısı
 * @returns 
 */
export function Login(user) {
  return function (dispatch) {
    return LoginUser(user)
      .then((res) => {
        if (res.success) {
          if (res.value.shouldNewPassword) {
            //dispatch(ChangeLoginToNewPassword(user.email));
            dispatch(
              ChangeLoginStatusSuccess(user.token, user.expiration, false, true)
            );
          } else {
            user = res.value;
            dispatch(LoginSuccess(user));
            //test
            dispatch(
              ChangeLoginStatusSuccess(user.token, user.expiration, true)
            );
          }
        } else {
          ShowStatusError(res.getResultsStringFormat());
          dispatch(ChangeLoginStatusSuccess("", new Date(), false));
          dispatch(LoginSuccess(new User()));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
}
