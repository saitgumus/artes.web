export default class User {
    userId;
    email;
    firstName;
    lastName;
    password;
    token;
    expiration;
    fullName;
    status = true;
    userType = 2;
    hotelId = 1;
    claims;
}

export class Subscription {
    userId;
    memberLimit;
    apartmentLimit;
}
