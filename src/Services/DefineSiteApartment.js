import { CommonTypes } from "../Types/Common";
import { Response, Severity } from "../Core/Response";
import { HttpClientServiceInstance } from "./HttpClient";
//import Cache from "./Cache";

/**
 * site/apartman kaydı yapılır.
 * return {Response}
 * @param {object} siteApartmentContract
 */
export async function DefineSiteApartmentService(siteApartmentContract) {
  const returnObject = new Response();
  let user = JSON.parse(localStorage.getItem("user" || {}));

  if (!user || user.userName.length < 1) {
    returnObject.addResult("Yeniden giriş yapınız.", Severity.Low);
  }

  if (!siteApartmentContract) {
    returnObject.addResult("apartman bilgisi boş olamaz.", Severity.Low);
    return returnObject;
  }
  siteApartmentContract.managerUserName = user.userName;
  siteApartmentContract.managerUserId = user.userId;

  await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAPI("apartment", "saveapartment"),
    siteApartmentContract
  ).then((res) => {
    if (res.status === CommonTypes.ResponseStatusCode.successful.created) {
      //todo: will set.
      console.log("defined new apartment.", siteApartmentContract.name);
      returnObject.value = 1;
    }
  });

  return returnObject;
}
