import { getDateIsoDate } from "../Types/Common";
import Alertify from "alertifyjs";

export const StringBuilder = require("string-builder");

/**
 * metin değerlerinin doluluğunu kontrol eder.
 * undefined veya boş ise true döner.
 * @param {string} text kontrol edilecek metin
 */
export function IsNullOrEmpty(text) {
  return !(text && text.length > 0);
}
/**
 * array içerisindeki elemanların null kontrolü yapılır.
 * @param {Array} params
 */
export function IsNullOrEmptyAll(params) {
  if (params && params.length > 0) {
    for (const item of params) {
      if (IsNullOrEmpty(item)) return true;
    }
    return false;
  }
  return false;
}

/**
 * obj eğer geçerli bir obje ise true döner.
 * @param obj
 * @returns {boolean}
 * @constructor
 */
export function IsValidObject(obj) {
  return !!(obj && typeof obj === "object");
}

/**
 * girilen değer geçersiz ise -1 döner.
 * geçerli ise değeri int oalarak döner
 * @param value
 * @returns {number}
 * @constructor
 */
export function GetIntValue(value) {
  if (value && typeof value === "number") {
    return parseInt(value);
  }
  if (value && typeof value === "string") {
    let val = -1;
    try {
      val = parseInt(value);
      return val;
    } catch (e) {
      return -1;
    }
  } else return -1;
}

/**
 * tarih kontrolü yapar.
 * eğer bugünden küçük veya geçersiz ise false döner.
 * @param value
 * @returns {boolean}
 * @constructor
 */
export function DateControlOlderToday(value) {
  // eslint-disable-next-line valid-typeof
  if (value && typeof value === "date") {
    let date = getDateIsoDate();
    return value >= date;
  }
  return false;
}

/**
 * eğer item1 < item2 ise ve tarihler geçerli ise true döner
 * @param item1
 * @param item2
 * @returns {boolean}
 * @constructor
 */
export function IsBiggerDate(item1, item2) {
  // eslint-disable-next-line valid-typeof
  if (item1 && typeof item1 === "date" && item2 && typeof item2 === "date") {
    return item1 <= item2;
  }
  return false;
}

/**
 * bir ay öncesini verir
 * @param date {Date}
 * @returns {Date}
 * @constructor
 */
export function GetOneMonthAgo(date = new Date()){
  
  if(date.getMonth() === 0){
    var year = date.getFullYear()-1;
    date.setFullYear(year);
    date.setMonth(11);
  }else{
    var month = date.getMonth()-1;
    date.setMonth(month);
  }
  return date;
}

/**
 * is value -1 ? true:
 * @param value
 * @returns {boolean}
 * @constructor
 */
export function IsInvalidIndex(value) {
  return value === -1;
}

/**
 * returned login user
 * @returns {User}
 * @constructor
 */
export function GetActiveLocalUser() {
  return JSON.parse(localStorage.getItem("user" || {}));
}

/**
 * returned message
 * @param propertyName
 * @constructor
 */
export function GetMessage(propertyName) {
  if (propertyName) {
    //mesaj servisi oluşturulacak.
  }
}

//#region status messages

/**
 * status'ta hata mesajı gösterir.
 * @param message
 * @constructor
 */
export function ShowStatusError(message) {
  Alertify.error(message);
}
/**
 * status'ta bilgi mesajı gösterir.
 * @param message
 * @constructor
 */
export function ShowStatusInfo(message) {
  Alertify.notify(message);
}
/**
 * status'ta başarılı mesajı gösterir.
 * @param message
 * @constructor
 */
export function ShowStatusSuccess(message) {
  Alertify.success(message);
}
/**
 * status'ta uyarı mesajı gösterir.
 * @param message
 * @constructor
 */
export function ShowStatusWarning(message) {
  Alertify.warning(message);
}
//#endregion
