import { CommonTypes } from "../Types/Common";
import Cache from "./Cache";
import { HttpClientServiceInstance } from "./HttpClient";
import { Response, Severity } from "../Core/Response";
import Country from "../Models/Country";

/**
 * the parameter services
 */
export class ParameterService {
  /**
   * parametre listesi döndürür.
   * @param {String} paramType - parametre tipi
   */
  async GetParameter(paramType) {
    let returnObject = new Response();

    if (!paramType || paramType.length < 1) {
      returnObject.addResult("Parametre tipi alınamadı.", Severity.Low);
      return returnObject;
    }

    let parameters = [];

    await HttpClientServiceInstance.post(
      CommonTypes.GetUrlForAPI("core", "getparameter"),
      {
        ParamType: paramType,
      }
    )
      .then((res) => {
        let data = res.data;
        if (data && data.length > 0) {
          data.forEach((element) => {
            parameters.push(element);
          });
          Cache.setParameter(paramType, parameters);
        }

        returnObject.valueList = parameters;
      })
      .catch((e) => {
        console.log(e);
        returnObject.addResult("parametre listesi getirilemedi.", Severity.Low);
      });

    return returnObject;
  }
}

/**
 * rol listesini döndürür
 */
export async function GetRoleList() {
  let returnData = [];

  if (Cache.lru.has("rolelist")) {
    let listfromcache = Cache.lru.get("managerapartmentlist");
    returnData = listfromcache;
  }

  await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAPI("core", "getrolelist")
  )
    .then((res) => {
      let data = res.data;
      if (data && data.length > 0) {
        Cache.lru.set("rolelist", data);
      }
      returnData = data ? data : [];
    })
    .catch((e) => {
      console.log(e);
      returnData = undefined;
    });

  return returnData;
}

/**
 * ülke listesi getirir.
 * @returns []
 */
export async function GetCountryList(){
  let returnData = [];

  await HttpClientServiceInstance.get(
    CommonTypes.GetUrlForAPI("constants", "get-countries-list")
  )
    .then((res) => {
        if(res.data && res.data.data){
            let data = res.data.data;
            let countryList = [];
            if (data && data.length > 0) {
                for (const item of data) {
                    countryList.push({name:item.constantValue,code:item.constantCode})
                }
                Cache.lru.set("countrylist", data);
            }
            returnData = countryList;
        }
    })
    .catch((e) => {
      console.log(e);
      returnData = undefined;
    });

  return returnData;
}
