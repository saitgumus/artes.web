import { CommonTypes } from "../Types/Common";
import { Response, Severity } from "../Core/Response";
import { HttpClientServiceInstance } from "./HttpClient";
import { GetActiveLocalUser } from "../Core/Helper";

/**
 * bütün ihale listesi getirilir.
 */
export async function GetAllTenderList() {
  let returnObject = new Response();
  let url = CommonTypes.GetUrlForTender("tender", "gettenderall");

  // eslint-disable-next-line
  var _ = await HttpClientServiceInstance.post(url, {})
    .then((res) => {
      let response = res.data;
      if (response && response.success) {
        returnObject.value = response.value;
      } else {
        returnObject.addResult("İhale listesi alınamadı.", Severity.High);
      }
    })
    .catch((err) => {
      returnObject.addResult(err.message);
    });

  return returnObject;
}

/**
 * ihale detayı getirilir.
 * @param {TenderContract} contract
 */
export async function GetTenderDetail(contract) {
  let returnObject = new Response();
  let url = CommonTypes.GetUrlForPurchasing("tender", "gettenderdetail");

  if (!contract.tenderId) {
    returnObject.addCoreResults("ihale bilgisi alınamadı.");
    return returnObject;
  }

  // eslint-disable-next-line
  var _ = await HttpClientServiceInstance.post(url, contract)
    .then((res) => {
      let response = res.data;
      if (response && response.success) {
        returnObject.value = response.value;
      } else {
        returnObject.addResult("İhale bilgisi alınamadı.", Severity.Low);
      }
    })
    .catch((err) => {
      returnObject.addResult(err.message);
    });

  return returnObject;
}

/**
 * yeni ihale kaydı yapar.
 * @param {TenderContract} contract
 */
export async function SaveTender(contract) {
  let returnObject = new Response();
  let url = CommonTypes.GetUrlForPurchasing("tender", "savetender");
  var user = GetActiveLocalUser();
  contract.userId = user.userId;

  // eslint-disable-next-line
  var _ = await HttpClientServiceInstance.post(url, contract)
    .then((res) => {
      let response = res.data;
      if (response && response.success) {
        returnObject.value = response.value;
      } else {
        returnObject.addResult("İhale oluşturulamadı.", Severity.Low);
      }
    })
    .catch((err) => {
      returnObject.addResult(err.message);
    });

  return returnObject;
}

/**
 * apartmana ait ihale bilgileri getirilir.
 * @param {TenderContract} contract
 */
export async function GetTenderByApartment(contract) {
  let returnObject = new Response();
  let url = CommonTypes.GetUrlForPurchasing("tender", "gettenderbyapartment");

  // eslint-disable-next-line
  var _ = await HttpClientServiceInstance.post(url, contract)
    .then((res) => {
      let response = res.data;
      if (response && response.success) {
        returnObject.value = response.value;
      } else {
        returnObject.addResult("ihale bilgisi getirilemedi.", Severity.Low);
      }
    })
    .catch((err) => {
      returnObject.addResult(err.message);
    });

  return returnObject;
}

/**
 * ihale listesi getirir.
 * @param {{cityId,countyId}} filterContract
 */
export async function GetTenderListAll(filterContract) {
  let ro = new Response();

  return await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForPurchasing("tender", "gettenderall"),
    { ...filterContract }
  )
    .then((res) => {
      if (res && res.data) {
        var responseData = res.data;

        if (responseData.success) {
          ro.value = responseData.value;
          return ro;
        } else {
          ro.addCoreResults(responseData.results);
          return ro;
        }
      } else {
        return ro;
      }
    })
    .catch((err) => {
      return ro;
    });
}

/**
 * yeni teklif kaydı yapılır.
 * @param {OfferContract} offerContract
 */
export async function SaveNewOffer(offerContract) {
  let ro = new Response();
  if (!offerContract) {
    ro.addResult("Teklif bilgisi alınamadı.");
  }
  return await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForPurchasing("tender", "saveoffer"),
    offerContract
  )
    .then((res) => {
      if (!res || !res.data) ro.addResult("İşlem yapılamadı.");

      if (res.data && res.data.success) {
        ro.value = res.data.value;
      } else {
        ro.addCoreResults(res.data.results);
      }
      Promise.resolve(ro);
    })
    .catch((err) => {
      Promise.reject(err);
    });
}
