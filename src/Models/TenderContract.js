export class TenderContract {
  tenderId;
  name;
  apartmentId;
  agreementId;
  description;
  userId;
  beginDate;
  endDate;
  systemDate;
  updateDate;
  agreement;
  userFullName;
  apartmentName;
  addressText;
  cityName;
  countyName;
  minOffer;
  firstAmount;

  cityId;
  countyId;
}

export class AgreementContract {
  agreementId;
  subject;
  description;
  title;
  content;
  hash;
}

export class OfferContract {
  offerId;
  companyId;
  tenderId;
  offeredAmount;
  systemDate;
}
