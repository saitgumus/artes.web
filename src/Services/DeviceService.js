import { Response, Severity } from "../Core/Response";
import { CommonTypes } from "../Types/Common";
import { HttpClientServiceInstance } from "./HttpClient";

/**
 * getting devices
 * @returns 
 */
export async function GetDevices() {
    let returnObject = new Response();
    
    let url = CommonTypes.GetUrlForAPI("brasscodevices","getall");

    await HttpClientServiceInstance.get(
        url
    ).then( res => {
        if(res.data && res.data.success){
            returnObject.value = res.data.data;
        }
        else{
            returnObject.addResult(res.data && res.data.errorMessage,Severity.High,"GETDEVICES");
        }
    })
    .catch(err => {
        returnObject.addResult("device listesi getirilemedi.");
    });

    return returnObject;
}

/**
 * save the device
 * @param deviceModel
 * @return {Promise<Response>}
 * @constructor
 */
export async function SaveDevice(deviceModel) {
    let returnObject = new Response();

    let url = CommonTypes.GetUrlForAPI("brasscodevices","save");

    await HttpClientServiceInstance.post(
        url,
        deviceModel
    ).then( res => {
        debugger;
        if(res.data && res.data.success){
            returnObject.value = true;
        }
        else{
            returnObject.addResult(res.data && res.data.errorMessage,Severity.High,"GETDEVICES");
        }
    })
        .catch(err => {
            returnObject.addResult("kayıt işlemi yapılamadı.");
        });

    return returnObject;
}

/**
 * delete the device
 * @param {DeviceModel} deviceModel
 * @returns 
 */
export async function DeleteDevice(deviceModel) {
    let returnObject = new Response();

    let url = CommonTypes.GetUrlForAPI("brasscodevices","delete");

    await HttpClientServiceInstance.post(
        url,
        deviceModel
    ).then( res => {
        if(res.data && res.data.success){
            returnObject.value = true;
        }
        else{
            returnObject.addResult(res.data && res.data.errorMessage,Severity.High,"DELETEDEVICES");
        }
    })
        .catch(err => {
            returnObject.addResult("silme işlemi yapılamadı.");
        });

    return returnObject;
}
