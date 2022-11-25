import { CommonTypes } from "../Types/Common";
import { HttpClientServiceInstance } from "./HttpClient";
import { Response, Severity } from "../Core/Response";
import User from "../Models/User";

/**
 * login the user
 * @param userContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function LoginUser(userContract) {
  let response = new Response();
  let contract = userContract;
  let url = CommonTypes.GetUrlForAPI("auth", "login");

  await HttpClientServiceInstance.post(url, contract)
    .then((res) => {
      if (res.data.success) {
        //parola değişikliği gerekiyor mu?
        if (
          res.data.data.accessToken &&
          res.data.value.accessToken.token &&
          res.data.value.accessToken.token.length > 0 &&
          res.data.value.shouldNewPassword
        ) {
          HttpClientServiceInstance.setTokenOnLogin(
            res.data.value.accessToken.token
          );
          response.value = { shouldNewPassword: true };
        } else {

          if(res.data.data && res.data.data.token){
            let token = res.data.data.token;
            let expriation = res.data.data.expiration;
            HttpClientServiceInstance.setTokenOnLogin(token);

            let user = new User();
            user.token = token;
            user.expiration = expriation;
            response.value = user;
          }else {
            response.addResult("Token bilgisi alınamadı.",Severity.High);
          }
        }
      } else {
        response.addCoreResults(res.data.results);
      }
    })
    .catch((e) => {
      response.addResult(e.message, Severity.High, "login");
    });

  return response;
}

/**
 * parolayı yenilemek için doğrulama kodu istenir.
 * @param {userContract} userContract
 */
export async function ForgotPassword(userContract) {
  let ro = new Response();
  let contract = userContract;
  let url = CommonTypes.GetUrlForAPI("user", "forgotpassword");

  await HttpClientServiceInstance.post(url, contract)
    .then((res) => {
      if (res.data && res.data.success) {
        ro.value = res.data.value;
      } else {
        ro.addCoreResults(res.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return ro;
}

/**
 * yeni şifre belirler
 * @param {string} password
 */
export async function SetNewPassword(password, email) {
  let ro = new Response();
  let contract = new User();
  contract.email = email;
  contract.password = password;

  let url = CommonTypes.GetUrlForAPI("user", "newpassword");

  await HttpClientServiceInstance.post(url, contract)
    .then((res) => {
      if (res.data && res.data.success) {
        ro.value = res.data.value;
        return ro;
      } else {
        ro.addCoreResults(res.data.results);
        return ro;
      }
    })
    .catch((err) => {
      console.log(err);
      ro.addResult("Parola değişikliği yapılamadı.");
      return ro;
    });
}

/**
 * add a new artes user
 * @param {UserModel} userContract 
 * @returns 
 */
export async function AddUser(userContract) {
  let response = new Response();
  let contract = userContract;
  let url = CommonTypes.GetUrlForAPI("users", "add");

  await HttpClientServiceInstance.post(url, contract)
    .then((res) => {
      if (res.data.success) {
        response.value = res.data;
      } else {
        response.addCoreResults(res.data.results);
      }
    })
    .catch((e) => {
      response.addResult(e.message, Severity.High, "user-add");
    });

  return response;

}

/**
 * update user
 * @param {UserModel} userContract 
 * @returns 
 */
export async function UpdateUser(userContract) {
  let response = new Response();
  let contract = userContract;
  let url = CommonTypes.GetUrlForAPI("users", "update");

  await HttpClientServiceInstance.post(url, contract)
    .then((res) => {
      if (res.data.success) {
        response.value = res.data;
      } else {
        response.addCoreResults(res.data.results);
      }
    })
    .catch((e) => {
      response.addResult(e.message, Severity.High, "user-update");
    });

  return response;

}

/**
 * delete user
 * @param {UserModel} userContract 
 * @returns 
 */
 export async function DeleteUser(userContract) {
  let response = new Response();
  let contract = userContract;
  let url = CommonTypes.GetUrlForAPI("users", "");

  await HttpClientServiceInstance.delete(url, contract)
    .then((res) => {
      if (res.data.success) {
        response.value = res.data;
      } else {
        response.addCoreResults(res.data.results);
      }
    })
    .catch((e) => {
      response.addResult(e.message, Severity.High, "user-update");
    });

  return response;

}

/**
 * get artes users
 * @returns Users
 */
export async function GetUsers() {
  let returnObject = new Response();
  
  let url = CommonTypes.GetUrlForAPI("users","getall");

  await HttpClientServiceInstance.get(
      url
  ).then( res => {
    
      if(res.data && res.data.success){
          returnObject.value = res.data.data;
      }
      else{
          returnObject.addResult(res.data && res.data.errorMessage,Severity.High,"GETUSERS");
      }
  })
  .catch(err => {
      returnObject.addResult("user listesi getirilemedi.");
  });

  return returnObject;
}

