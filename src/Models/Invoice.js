/**
 * fatura
 */
export class InvoiceContract {
  invoiceId;
  invoiceNumber;
  taxNumber;
  accountNumber;
  userId;
  invoiceDate;
  totalAmount;
  apartmentId;
  description;
  invoiceLineList;
  companyName;
  constructor() {
    this.invoiceLineList = [];
  }
}
/**
 * fatura satırı
 */
export class InvoiceLineContract {
  invoiceLineId;
  invoiceId;
  quantity;
  amount;
  unitPrice;
  description;
}
