import { CommonTypes } from "../../Types/Common";
import * as actionTypes from "./action-types";
import Cache from "../../Services/Cache";
import {HttpClientServiceInstance} from "../../Services/HttpClient";

export function getCityListSuccess(city) {
  return {
    type: actionTypes.GETCITYLIST,
    payload: city,
  };
}

export function changeSelectedCityId(cityId) {
  return {
    type: actionTypes.CHANGE_SELECTED_CITY_ID,
    payload: cityId,
  };
}

export function getCityList() {
  return function (dispatch) {
    if (Cache.lru.has(CommonTypes.CacheKeys.CityList)) {
      return dispatch(
        getCountyListSuccess(Cache.lru.get(CommonTypes.CacheKeys.CityList))
      );
    }

    let url = CommonTypes.GetUrlForAPI("core", "citylist");
    
    return HttpClientServiceInstance.post(url)
        .then((res) => {
      if (!Cache.lru.has(CommonTypes.CacheKeys.CountyList)) {
        Cache.lru.set(
          CommonTypes.CacheKeys.CountyList,
          JSON.parse(JSON.stringify(res.data))
        );
      }
      dispatch(getCityListSuccess(JSON.parse(JSON.stringify(res.data))));
    });
  };
}

export function getCountyListSuccess(countylist) {
  return {
    type: actionTypes.GETCOUNTYLIST,
    payload: countylist,
  };
}

export function getCountyListAll() {
  return function (dispatch) {
    if (Cache.lru.has(CommonTypes.CacheKeys.CountyList)) {
      return dispatch(
        getCountyListSuccess(Cache.lru.get(CommonTypes.CacheKeys.CountyList))
      );
    }
    let url = CommonTypes.GetUrlForAPI("core", "countylist");
    return HttpClientServiceInstance.post(url).then((res) => {
      //caching yapılır..
      if (!Cache.lru.has(CommonTypes.CacheKeys.CountyList)) {
        Cache.lru.set(
          CommonTypes.CacheKeys.CountyList,
          JSON.parse(JSON.stringify(res.data))
        );
      }

      dispatch(getCountyListSuccess(JSON.parse(JSON.stringify(res.data))));
    });
  };
}
