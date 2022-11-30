export default class Messages {
    static PlsLogIn = "Merhaba. Lütfen giriş yapınız...";
    static EMailInputFormText = "Geçerli ve aktif bir mail adresi giriniz.";
    static EMailInvalid = "Geçersiz mail adresi.";
    static EMailValid = "";

    static MenuNames = {
        Main: {
            admin: "Admin",
        },
        Action: {
            addApartmernOrSite: "Site/Aparman ekle",
        },
        Other: {
            managment: "Yönetim",
        },
    };

    static Titles = {
        defineBlock: "Blok ekleme",
    };

    static ActionNames = {
        /**refresh */
        refresh: "Refresh",
        /** distributor kaydet */
        createDistributor: "Create distributor",
        /** create user */
        createUser: "Create User",
        /** update user */
        updateUser: "Update User",
        /** delete user */
        deleteUser: "Delete User",
        /** otel ekle */
        createHotel: "Create Hotel",
        /** cihaz ekle */
        createDevice: "Create Device",
        /**
         * yetki yönetimi
         */
        userClaims: 'Yetki Yönetimi',
        /**kaydet */
        save: "Kaydet",
        /**giriş yap */
        enter: "Giriş Yap",
        /**ekle */
        add: "Ekle",
        /** bilgi getir, listele*/
        getInfo: "Bilgi Getir",
        /* güncelle */
        edit: "Güncelle",
        /* kapat */
        close: "Kapat",
        /* İncele */
        examine: "İncele",
        /* Oku */
        read: "Oku",
        /* sil */
        delete: "Sil",
    };

    static LabelNames = {
        name: "Adınız",
        surname: "Soyadınız",
        email: "Mail Adresiniz",
        address: "Adres",
        zipcode: "Posta Kodu",
        city: "İl",
        county: "İlçe",
        recordType: "Kayıt Türü",
        password: "Parola",
        floorCount: "Kat Sayısı",
        blockCount: "Blok Sayısı",
        blockName: "Blok Adı",
    };

    static Warnings = {
        selectRecordType: "Kayıt Türünü Seçiniz..",
        /**işlem başarısız oldu. */
        CouldNotDoProc: "İşlem başarısız.",
    };

    static Information = {
        /**
         * işlem başarılı
         */
        Success: "İşlem Başarılı.",
    };

    static Errors = {
        InvalidInformation: "Eksik veya hatalı bilgi girdiniz.",
        /**hata oluştu mesajı */
        AccurredAnError: "İşlem yapılırken hata meydana geldi.",
        /**
         * geçersiz mail veya parola
         */
        InvalidMailOrUser: "Geçersiz mail adresi veya parola..",
    };
}
