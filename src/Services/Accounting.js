import { CommonTypes } from "../Types/Common";
import { Response, Severity } from "../Core/Response";
import { HttpClientServiceInstance } from "./HttpClient";
import { GetActiveLocalUser } from "../Core/Helper";
import { InvoiceContract } from "../Models/Invoice";

/**
 * Masraf giriş kaydı yapılır.
 * @param expenseContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function SaveExpense(expenseContract) {
  const returnObject = new Response();
  let user = GetActiveLocalUser();

  if (!user || user.userId < 1) {
    returnObject.addResult("Yeniden giriş yapınız.", Severity.Low);
    return returnObject;
  }

  if (!expenseContract) {
    returnObject.addResult("masraf/fatura bilgileri boş olamaz.", Severity.Low);
    return returnObject;
  }
  expenseContract.userId = user.userId;

  await HttpClientServiceInstance.post(
    CommonTypes.GetUrlForAccount("expense", "savenewexpense"),
    expenseContract
  )
    .then((res) => {
      if (res.status === CommonTypes.ResponseStatusCode.successful.created) {
        returnObject.value = 1;
      } else if (res.data) {
        if (!res.data.success) {
          returnObject.addCoreResults(res.data.results);
        }
      }
    })
    .catch((err) => {
      returnObject.addResult(err.message);
    });

  return returnObject;
}

/**
 * masraf listesi getirilir
 * @param {InvoiceContract} invoiceFilterContract
 */
export async function GetExpenceList(invoiceFilterContract) {
  let ro = new Response();
  let filterContract = { ...invoiceFilterContract };
  let url = CommonTypes.GetUrlForAccount("expense", "getexpenselist");
  // eslint-disable-next-line
  let asd = await HttpClientServiceInstance.post(url, filterContract)
    .then((response) => {
      if (!response.data) {
        ro.addResult("Masraf listesi getirilirken hata oluştu.");
      }
      if (response.data.success) {
        ro.value = response.data.value;
      } else {
        ro.addCoreResults(response.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
      ro.addResult(err.message);
    })
    .finally(() => {});
  return ro;
}

/**
 * masraf detayı getirir.
 * @param {number} invoiceId
 */
export async function GetExpenseDetail(invoiceId) {
  let ro = new Response();
  let contract = new InvoiceContract();
  contract.invoiceId = invoiceId;

  let url = CommonTypes.GetUrlForAccount("expense", "getexpensedetail");
  // eslint-disable-next-line
  let asd = await HttpClientServiceInstance.post(url, contract)
    .then((response) => {
      if (!response.data) {
        ro.addResult("Masraf detayı getirilirken hata oluştu.");
      }
      if (response.data.success) {
        ro.value = response.data.value;
      } else {
        ro.addCoreResults(response.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
      ro.addResult(err.message);
    })
    .finally(() => {});
  return ro;
}

/**
 * aidat ödeme işlemi yapılır.
 * @param {DuesContract} duesContract
 * @returns {Promise<T|Response>}
 * @constructor
 */
export async function SendDuesPayment(duesContract) {
 let ro = new Response();
 let user = GetActiveLocalUser();
 duesContract.userId = user.userId;

 return await HttpClientServiceInstance.post(
     CommonTypes.GetUrlForAccount("dues","paydues"),
     duesContract
 ).then(
     res => {
         let data = res && res.data;
         if(data){
             if(data.success){
                 ro.value = data.value;
             }else{
                 ro.addCoreResults(data.results);
             }
         }else{
             ro.addResult("İşlem gerçekleştirilemedi.",Severity.Low);
         }
         return ro;
     }
 ).catch(
     err => {
         console.error(err);
         return ro;
     }
 )
}

/**
 * aidat listesi getirir.
 * @param {DuesContract} filterContract
 * @returns {Promise<T|Response>}
 * @constructor
 */
export async function GetDuesList(filterContract) {
 let ro = new Response();
 
 return await HttpClientServiceInstance.post(
     CommonTypes.GetUrlForAccount("dues","getdueslist"),
     filterContract
 ).then(
     res => {
         let data = res.data;
         if(data){
             if(data.success){
                 ro.value = data.value;
                 return ro;
             }else{
                 ro.addCoreResults(data.results);
                 return ro;
             }
         }else{
             ro.addResult("Liste alınamadı.");
             return ro;
         }
     }
 ).catch(
     e => {
         console.log(e);
         ro.addResult("liste alınamadı");
         return ro;
     }
 )
}