export default class User {
  userId;
  userName;
  email;
  firstName;
  lastName;
  password;
  MemberId;
  token;
  expiration;
  fullName;
  status = true;
  userType=2;
  hotelId=1;
}

export class Subscription {
  subscriptionId;
  userId;
  startDate;
  endDate;
  memberLimit;
  apartmentLimit;
}
