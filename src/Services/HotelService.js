import { Response, Severity } from "../Core/Response";
import { CommonTypes } from "../Types/Common";
import { HttpClientServiceInstance } from "./HttpClient";

/**
 * hotel listesi döndürür.
 * @returns {Promise<Response>}
 * @constructor
 */
export async function GetHotels() {
    let returnObject = new Response();
    
    let url = CommonTypes.GetUrlForAPI("hotels","get-hotel-list");

    await HttpClientServiceInstance.get(
        url
    ).then( res => {
        if(res.data && res.data.success){
            returnObject.value = res.data.data;
        }
        else{
            returnObject.addResult(res.data && res.data.errorMessage,Severity.High,"GETHOTELS");
        }
    })
    .catch(err => {
        returnObject.addResult("hotel listesi getirilemedi.");
    });

    return returnObject;
}

/**
 * yeni otel kaydı
 * @param {HotelModel} model
 * @return {Response}
 */
export async function SaveHotel(model) {
    let returnObject = new Response();
    let url = CommonTypes.GetUrlForAPI("hotels","add-hotel");

    await HttpClientServiceInstance.post(
        url,model
    ).then( res => {
        if(res.data && res.data.success){
            returnObject.value = res.data.data;
        }
        else{
            returnObject.addResult(res.data && res.data.errorMessage,Severity.High,"SAVEHOTEL");
        }
    })
    .catch(err => {
        console.log(err);
        returnObject.addResult("hotel kaydı yapılamadı.");
    })

    return returnObject;
}

export async function UpdateHotel(model) {
    let returnObject = new Response();
    let url = CommonTypes.GetUrlForAPI("hotels","update-hotel");

    await HttpClientServiceInstance.put(url,model)
    .then( res => {
        if(res.data && res.data.success){
            returnObject.value = true;
        }
        else{
            returnObject.addResult(res.data && res.data.errorMessage, Severity.High,"UPDATEHOTEL");
        }
    })
    .catch(err => {
        console.log(err);
        returnObject.addResult("güncelleme işlemi başarısız oldu.");
    })

    return returnObject;
}