import { CommonTypes } from "../Types/Common";
import { HttpClientServiceInstance } from "./HttpClient";
//import Cache from "./Cache";
import { Response, Severity } from "../Core/Response";
import { VoteContract, VoteItem } from "../Models/VoteContract";
import { GetActiveLocalUser, GetIntValue } from "../Core/Helper";

/**
 * Anket kaydetme işlemi yapar
 * @param voteContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function AddVote(voteContract) {
  let response = new Response();
  let contract = new VoteContract();
  contract = voteContract;

  if (GetIntValue(contract.apartmentId) < 1) {
    response.addResult("apartman bilgisi alınamadı.");
    return response;
  }

  await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAPI("vote", "addvote"),
    contract
  )
    .then((res) => {
      if (res.status === CommonTypes.ResponseStatusCode.successful.created) {
        response.value = 1;
      }
      if (
        res.status === CommonTypes.ResponseStatusCode.clientError.badRequest
      ) {
        response.addResult(
          "eksik veya hatalı giriş yapıldı.. lütfen tekrar deneyiniz."
        );
      }
    })
    .catch((e) => {
      response.addResult("Anket kaydetme işlemi başarısız." + e.message);
    });
  return response;
}

/**
 * get vote result
 * @param voteContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function GetVoteResultlist(voteContract) {
  var response = new Response();
  if (!voteContract) {
    response.addResult(
      "kriterleri kontrol ederek tekrar deneyiniz.",
      Severity.Low
    );
    return response;
  }

  await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAPI("vote", "getvoteresultlist"),
    voteContract
  )
    .then((res) => {
      if (res.status === CommonTypes.ResponseStatusCode.successful.success) {
        response.value = res.value;
      }
      if (
        res.status === CommonTypes.ResponseStatusCode.clientError.badRequest
      ) {
        response.addResult(
          "eksik veya hatalı giriş yapıldı.. lütfen tekrar deneyiniz."
        );
      }
    })
    .catch((e) => {
      response.addResult(
        "Sonuç listesi alınamadı. Daha snra tekrar deneyiniz." + e.message
      );
    });

  return response;
}

/**
 * oy kullanımını bekleyen anketleri getirir.
 * @param voteContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function GetUserVote() {
  let response = new Response();
  let userContract = JSON.parse(localStorage.getItem("user" || {}));
  if (!userContract) {
    response.addResult("Kullanıcı bilgileriniz alınamadı.", Severity.Low);
    return response;
  }

  await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAPI("vote", "getuservotes"),
    userContract
  )
    .then((res) => {
      if (res.status === CommonTypes.ResponseStatusCode.successful.success) {
        response.value = res.data.value;
      }
      if (
        res.status === CommonTypes.ResponseStatusCode.clientError.badRequest
      ) {
        response.addResult(
          "eksik veya hatalı giriş yapıldı.. lütfen tekrar deneyiniz."
        );
      }
    })
    .catch((e) => {
      response.addResult(
        "Sonuç listesi alınamadı. Daha snra tekrar deneyiniz." + e.message
      );
    });

  return response;
}

/**
 * send user vote
 * @returns {Promise<Response>}
 * @constructor
 */
export async function UserToVote(option, contract) {
  let response = new Response();

  if (!contract) {
    response.addResult("oy bilgileriniz alınamadı.", Severity.Low);
    return response;
  }

  let userContract = JSON.parse(localStorage.getItem("user" || {}));
  if (!contract) {
    response.addResult("kullanıcı bilgileriniz alınamadı.", Severity.Low);
    return response;
  }

  let voteContract = contract;
  voteContract.userChoice = new VoteItem();
  voteContract.userChoice.voteOption = option;
  voteContract.userChoice.userId = userContract.userId;

  await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAPI("vote", "usertovote"),
    voteContract
  )
    .then((res) => {
      if (res.status === CommonTypes.ResponseStatusCode.successful.success) {
        response.value = res.data.value;
      }
      if (
        res.status === CommonTypes.ResponseStatusCode.clientError.badRequest
      ) {
        response.addResult(
          "eksik veya hatalı giriş yapıldı.. lütfen tekrar deneyiniz."
        );
      }
    })
    .catch((e) => {
      response.addResult("Hata meydana geldi." + e.message);
    });

  return response;
}

/**
 * anket sonuçları getirilir.
 * kullnıcının oy kullandığı tek anket için.
 * @param voteContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function GetVoteResult(voteContract) {
  let response = new Response();
  let user = GetActiveLocalUser();
  if (!user || GetIntValue(user.userId) < 1) {
    response.addResult("Kullanıcı bilginiz alınamadı.", Severity.Low);
    return response;
  }
  if (!voteContract) {
    response.addResult("Seçili anket bilgisi alınamadı.", Severity.Low);
    return response;
  }
  voteContract.userChoice = new VoteItem();
  voteContract.userChoice.userId = user.userId;

  await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAPI("vote", "getvoteresult"),
    voteContract
  )
    .then((res) => {
      if (res.status === CommonTypes.ResponseStatusCode.successful.success) {
        if (res.data && res.data.success) response.value = res.data.value;
        else if (res.data && res.data.success === false) {
          for (let item of res.data.results) {
            response.addResult(item.errorMessage);
          }
        }
      }
      if (
        res.status === CommonTypes.ResponseStatusCode.clientError.badRequest
      ) {
        response.addResult(
          "eksik veya hatalı giriş yapıldı.. lütfen tekrar deneyiniz."
        );
      }
    })
    .catch((e) => {
      console.log(e);
      response.addResult(
        "Sonuç listesi alınamadı. Daha sonra tekrar deneyiniz." + e.message
      );
    });

  return response;
}

/**
 * oy verilmiş olan anketler getirilir.
 * @returns {Promise<Response>}
 * @constructor
 */
export async function GetUsedUserVote() {
  let response = new Response();
  let userContract = JSON.parse(localStorage.getItem("user" || {}));
  if (!userContract) {
    response.addResult("Kullanıcı bilgileriniz alınamadı.", Severity.Low);
    return response;
  }

  await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAPI("vote", "getuserusedvotes"),
    userContract
  )
    .then((res) => {
      if (res.status === CommonTypes.ResponseStatusCode.successful.success) {
        response.value = res.data.value;
      }
      if (
        res.status === CommonTypes.ResponseStatusCode.clientError.badRequest
      ) {
        response.addResult(
          "eksik veya hatalı giriş yapıldı.. lütfen tekrar deneyiniz."
        );
      }
    })
    .catch((e) => {
      response.addResult(
        "Sonuç listesi alınamadı. Daha snra tekrar deneyiniz." + e.message
      );
    });

  return response;
}
