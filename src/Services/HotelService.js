import { Response, Severity } from "../Core/Response";
import { CommonTypes } from "../Types/Common";
import { HttpClientServiceInstance } from "./HttpClient";
import HotelModel from "../Models/hotel/HotelModel";

/**
 * hotel listesi getirir.
 */
export async function GetHotels() {
    let returnObject = new Response();
    
    let url = CommonTypes.GetUrlForAPI("hotel","gethotels");

    await HttpClientServiceInstance.post(
        url,{}
    ).then( res => {
        if(res.data && res.data.success){
            returnObject.value = res.data.data;
            return returnObject;
        }
        else{
            returnObject.addResult(res.data && res.data.errorMessage,Severity.High,"GETHOTELS");
            return returnObject;
        }
    })
    .catch(err => {
        returnObject.addResult("hotel listesi getirilemedi.");
        return returnObject;
    });

}

/**
 * yeni otel kaydı
 * @param {HotelModel} model 
 */
export async function SaveHotel(model) {
    let returnObject = new Response();
    
    let url = CommonTypes.GetUrlForAPI("hotel","savehotel");

    await HttpClientServiceInstance.post(
        url,model
    ).then( res => {
        if(res.data && res.data.success){
            returnObject.value = res.data.data;
            return returnObject;
        }
        else{
            returnObject.addResult(res.data && res.data.errorMessage,Severity.High,"SAVEHOTEL");
            return returnObject;
        }
    })
    .catch(err => {
        returnObject.addResult("hotel kaydı yapılamadı.");
        return returnObject;
    });

}