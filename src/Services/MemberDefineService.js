import { CommonTypes } from "../Types/Common";
import { HttpClientServiceInstance } from "./HttpClient";
//import Cache from "./Cache";
import { Response, Severity } from "../Core/Response";
import { MemberUserContract } from "../Models/MemberUserContract";
import { GetActiveLocalUser } from "../Core/Helper";

/*
 * kullanıcının yönetiminde olan apartman listesini döndürür
 * @param {string} userName
 * */
export async function GetApartmentListByManagerUserName(userName = "") {
  let user = GetActiveLocalUser();
  let returnData = [];
  //
  // let listfromcache = [];
  // if (Cache.lru.has("managerapartmentlist")) {
  //   listfromcache = Cache.lru.get("managerapartmentlist");
  //   console.log('cache list:', listfromcache)
  //   returnData = listfromcache;
  // } else
  if (user.token && user.token.length > 1) {
    await HttpClientServiceInstance.post(
      CommonTypes.GetUrlForAPI("apartment", "getapartmentsbymanager"),
      user
    )
      .then((res) => {
        returnData = res.data;
      })
      .catch((err) => {
        console.log("apartman listesi getirilirken hata oluştu :", err);
      });
  }
  return returnData;
}

/**
 * yeni üye kaydı yapılır.
 * @param {MemberUserContract} memberContract
 */
export async function SaveNewMember(memberContract) {
  if (!memberContract) {
    return;
  }

  let url = CommonTypes.GetUrlForAPI("user", "addmember");
  let response = {};

  await HttpClientServiceInstance.post(url, memberContract)
    .then((res) => {
      if (res.status === 201) {
        console.log("saved new member:", memberContract);
      }
      response = res;
    })
    .catch((e) => {
      console.log("occurred error for add member: ", e);
      response = e;
    });

  return response;
}

/**
 * yöneticinin kontrolündeki kullanıcıları getirir.
 * @param {MemberUserContract} memberContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function GetMemberListByUserId(memberContract) {
  let response = new Response();
  let member = new MemberUserContract();
  member.apartmentName = memberContract.apartmentName;

  let userlogin = JSON.parse(localStorage.getItem("user"));
  member.userId = userlogin.userId;

  if (!member || member.userId < 1) {
    response.addResult("Kullanıcı bilginiz alınamadı..");
    return response;
  } else {
    await HttpClientServiceInstance.post(
      CommonTypes.GetUrlForAPI("user", "memberlistbyuserid"),
      member
    )
      .then((res) => {
        console.log("getting list member..", res.data);
        response.value = res.data;
      })
      .catch((err) => {
        console.log("üye listesi getirilirken hata oluştu :", err);
        response.addResult("üye listesi getirilemedi...");
      });

    return response;
  }
}

/**
 * üye detaylarını getirir.
 * @param {number} memberId üye id
 *
 */
export async function GetMemberDetailByMemberId(memberId) {
  let response = new Response();
  let memberContract = new MemberUserContract();
  memberContract.memberId = memberId;

  if (memberId > 0) {
    await HttpClientServiceInstance.post(
      CommonTypes.GetUrlForAPI("user", "getmemberdetailbyid"),
      memberContract
    )
      .then((res) => {
        response.value = res.data;
      })
      .catch((err) => {
        response.addResult(
          "üye detayları getirilemedi.",
          Severity.Low,
          "server"
        );
        console.log("apartman listesi getirilirken hata oluştu :", err);
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
 * üye güncelleme işlemi yapılır.
 * @param {MemberUserContract} memberContract üye bilgisi
 */
export async function UpdateMemberUser(memberContract) {
  let response = new Response();

  if (!memberContract) {
    response.addResult(
      "üye bilgileri alınamadı. tekrar deneyiniz.",
      Severity.Low
    );
    return response;
  }

  let url = CommonTypes.GetUrlForAPI("user", "updatemember");

  await HttpClientServiceInstance.post(url, memberContract)
    .then((res) => {
      if (res.status === 201) {
        console.log("updated member :", memberContract);
      }
      response.value = res.data;
    })
    .catch((e) => {
      console.log("occurred error for add member: ", e);
      response.addResult(e.message, Severity.High);
    });

  return response;
}
