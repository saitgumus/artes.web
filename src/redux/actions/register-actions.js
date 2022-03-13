import * as actionTypes from "./action-types";
import { CommonTypes } from "../../Types/Common";
import {HttpClientServiceInstance} from "../../Services/HttpClient";

export function registerUserSuccess(registerUser) {
  return {
    type: actionTypes.REGISTER,
    payload: registerUser,
  };
}

export function registerUser(user) {
  return function (dispatch) {
    let url = CommonTypes.GetUrlForAPI("user", "saveuser");
    return HttpClientServiceInstance.post(url, user)
        .then((res) => {
          if(res.status === 201){
            let registerUser = {
              name : user.firstName + user.lastName,
              isRegistered: true
            }
            dispatch(registerUserSuccess(registerUser));
          }else {
            dispatch(registerUserSuccess({name:user.firstName+user.lastName,isRegistered:false}))
          }
    }).catch(e => console.log(e))
  };
}
