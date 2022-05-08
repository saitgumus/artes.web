export default class HotelModel {
    hotelId
    hotelName
    hotelCode
    hotelAdminName
    hotelAdminMail
    creationdate
    validSectors
    allowGeneralCard=false
    options
    countryCode
    mobileCountryCode
    mobileNumber
    contactType=1; //email 2-telefon
    address
}

/*
public enum UserTypes
{
systemManager = 1,
artesAdmin = 2, // Biz ekleyeceğiz tüm yetkiler olacak
artesPersonel = 3, // Artes web ekranından eklenecek yetkiler olacak
hotelAdmin = 4, // Artes ekranından otel tanımlarken otomatik oluşacak otel için gerekli tüm yetkiler olacak.
hotelPersonel = 5 // Hotel yönetim masaüstü uygulamasından eklenecek yetkiyi hotel edmin yönetebilecek.(biz bir takım yetkiler tanımlayacağız onlardan seçecek.)
}




public enum ContactType
{
mail = 1,
gsm = 2
}



public enum RoomStatus
{
Bos = 1,
Dolu = 2,
Temizdegil = 3
}
* */