import { CommonTypes } from "../Types/Common";
import { HttpClientServiceInstance } from "./HttpClient";
import Cache from "./Cache";
import { Response, Severity } from "../Core/Response";
import { InboxmessageContract } from "../Models/InboxMessageContract";
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
  let url = CommonTypes.GetUrlForAPI("user", "login");

  Cache.setItem("lastloginrequestuser", contract);

  await HttpClientServiceInstance.post(url, contract)
    .then((res) => {
      if (res.data.success) {
        //parola değişikliği gerekiyor mu?
        if (
          res.data.value.accessToken &&
          res.data.value.accessToken.token &&
          res.data.value.accessToken.token.length > 0 &&
          res.data.value.shouldNewPassword
        ) {
          HttpClientServiceInstance.setTokenOnLogin(
            res.data.value.accessToken.token
          );
          response.value = { shouldNewPassword: true };
        } else {
          let userData = res.data.value.userDefinitionContract;

          let user = new User();
          user.userId = userData.userId;
          user.email = userData.email;
          user.firstName = userData.firstName;
          user.lastName = userData.lastName;
          user.userName = userData.userName;

          if (res.data.value.companyContract) {
            user.isCorporateUser = true;
            user.company = { ...res.data.value.companyContract };
          }

          if (res.data.value.apartmentContract) {
            user.apartment = res.data.value.apartmentContract;
          }
          user.token = res.data.value.accessToken.token;
          user.expiration = res.data.value.accessToken.expiration;
          HttpClientServiceInstance.setTokenOnLogin(user.token);

          user.inboxNotificationCount = userData.inboxNotificationCount;
          user.generalNotificationCount = 0; //doldurulacak - sunucu tarafı null

          //resources
          user.resourceActionList = res.data.value.resourceActions;

          localStorage.setItem("user", JSON.stringify(user));
          HttpClientServiceInstance.setTokenOnLogin(user.token);

          response.value = user;
          SetUserResources(user.resourceActionList);
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
 * gelen kutusu bilgilerini getirir.
 * @param inboxmessageContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function GetUserInboxList(inboxmessageContract) {
  let response = new Response();
  let inboxContract = new InboxmessageContract();
  inboxContract = inboxmessageContract;

  if (inboxContract.receiverUserId > 0) {
    await HttpClientServiceInstance.post(
      CommonTypes.GetUrlForAPI("user", "getusermessages"),
      inboxContract
    )
      .then((res) => {
        response.value = res.data;
        console.log("inbox data:", response.value);
      })
      .catch((err) => {
        response.addResult("mesajlar getirilemedi.", Severity.High, "server");
      });
  } else {
    response.addResult(
      "üye id bilgisi alınamadı",
      Severity.Low,
      "null parameter"
    );
  }

  return response;
}

/**
 *
 * @returns {Promise<void>}
 * @param inboxId
 */
export async function updateMessageStatusForReaded(inboxId) {
  let response = new Response();
  let inboxContract = new InboxmessageContract();
  inboxContract.inboxId = inboxId;

  if (inboxContract.inboxId > 0) {
    await HttpClientServiceInstance.post(
      CommonTypes.GetUrlForAPI("user", "updatemessagestatus"),
      inboxContract
    )
      .then((res) => {
        response.value = res.data;
        console.log("message status updated");
      })
      .catch((err) => {
        response.addResult("mesajlar getirilemedi.", Severity.High, "server");
      });
  } else {
    response.addResult(
      "mesaj id bilgisi alınamadı",
      Severity.Low,
      "null parameter"
    );
  }

  return response;
}

/**
 * kaynak-aksiyon normalizasyonu yapılır.
 * @param {array} resourceActions
 */
function SetUserResources(resourceActions) {
  if (resourceActions && resourceActions.length > 0) {
    // var s = {
    //     parentCode:'',
    //     parentName:'',
    //     resources=[{
    //         resourceCode:'',
    //         resourceName:'',
    //         Actions:[{
    //
    //         }]
    //     }]
    // }
    let resourceList = [];

    for (let item of resourceActions) {
      //parent yoksa eklenir.
      if (!resourceList.find((x) => x.parentCode === item.parentCode)) {
        let tmpRes = {};
        tmpRes.parentCode = item.parentCode;
        tmpRes.parentName = item.parentName;
        tmpRes.resources = [];
        tmpRes.resources.Actions = [];
        resourceList.push(tmpRes);
      }

      let ind = resourceList.findIndex((r) => r.parentCode === item.parentCode);
      // let tmpR = resourceList[ind].Resources.find(val => val.resourceCode === item.resourceCode);

      //ekran eklenmemişse eklenir.
      if (
        !resourceList[ind].resources.find(
          (val) => val.resourceCode === item.resourceCode
        )
      ) {
        let resourceSub = {
          resourceCode: item.resourceCode,
          name: item.name,
          iconKey: item.iconKey,
          path: item.path,
          actions: [],
        };
        resourceList[ind].resources.push(resourceSub);
      }

      //aksiyon eklenmemişse eklenir
      if (
        resourceList[ind].resources.find(
          (val) => val.resourceCode === item.resourceCode
        ) &&
        !resourceList[ind].resources
          .find((val) => val.resourceCode === item.resourceCode)
          .actions.find((r) => r.actionKey === item.actionKey)
      ) {
        let act = {
          actionName: item.actionName,
          actionKey: item.actionKey,
        };
        resourceList[ind].resources
          .find((val) => val.resourceCode === item.resourceCode)
          .actions.push(act);
      }
    }
    Cache.overrideItem("resources", resourceList);
  }
}
/**
 * kurum kullanıcı kaydı
 * @param {Company} companyContract
 */
export async function RegisterCompany(companyContract) {
  let ro = new Response();

  return await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAPI("user", "savecompany"),
    companyContract
  )
    .then((res) => {
      if (!res && !res.data) {
        ro.addResult("Kullanıcı oluşturulamadı.");
        return ro;
      } else {
        if (res.data && res.data.success) {
          ro.value = res.data.value;
          return ro;
        } else {
          ro.addCoreResults(res.data.results);
          return ro;
        }
      }
    })
    .catch((err) => {
      ro.addResult("İşlem gerçekleştirilemedi.");
      return ro;
    });
}
