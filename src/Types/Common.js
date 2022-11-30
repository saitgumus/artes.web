import Messages from "./Messages";

const dateFormat = require("dateformat");

/**
 * common types for general components
 */
export class CommonTypes {
    static URLaddress = "https://srv341.heyloki.com:5011"; //23163 - api, 5001gateway
    static WebURLaddress = "http://srv341.heyloki.com:8000";

    /**
     *
     * @param {string} controllerName
     * @param {string} actionName
     */
    static GetUrlForAPI(controllerName, actionName) {
        return this.URLaddress.concat(
            "/api/",
            controllerName.trim(),
            "/",
            actionName.trim()
        );
    }

    static MessageTypes = {
        success: "success",
        error: "error",
        info: "info",
    };

    /**
     * the icon keys
     * @type {{viewlist: string, personadd: string, inbox: string, howtovote: string}}
     */
    static Iconkeys = {
        inbox: "inbox",
        personadd: "personadd",
        viewlist: "viewlist",
        howtovote: "howtovote",
        home: "home",
        addChart: "addchart",
        listChart: "listchart",
        paydue: "paydue",
        updown: "updown",
        profile: "profile",
        apartment: "apartment",
        refresh: "refresh",
        logout: "logout",
    };

    /**
     * cache keyleri tutulur.
     */
    static CacheKeys = {
        CityList: "CITYLIST",
        CountyList: "COUNTYLIST",
    };

    /**
     * aksiyon isimleri
     */
    static ActionKeys = {
        /**refresh */
        Refresh: "REFRESH",
        /** create distributor */
        CreateDistributor: "CREATEDIST",
        /** create a hotel */
        CreateHotel: "CREATEHOTEL",
        /** create user */
        CreateUser: "CREATEUSER",
        /** delete user */
        DeleteUser: "DELETEUSER",
        /** update user */
        UpdateUser: "UPDATEUSER",
        /**
         * kullanıcı yetki
         */
        ClaimsUser: "CLAIMSUSER",
        /** create a device */
        CreateDevice: "CREATEDEVICE",
        /** delete device */
        DeleteDevice: "DELETEDEVICE",
        /**
         * kaydet
         */
        Save: "SAVE",
        /**
         * bilgi getir (listele)
         * GETLIST
         */
        GetList: "GETLIST",
        /**
         * Temizle
         */
        Clean: "CLEAN",
        /**
         * kapat
         */
        Close: "CLOSE",
        /**
         * düzenle / güncelle
         */
        Edit: "EDIT",
        /**
         * incele / ayrıntı
         */
        Examine: "EXAMINE",
        /* Oku */
        Read: "READ",
        /* sözleşme ekle */
        AddAgreement: "ADDAGR",
        /*teklif ver */
        GiveOffer: "GVOFFR",
        /**döküman ekle */
        Divit: "DIVIT",
    };

    /**
     * aksiyon tiplerini tutar.
     */
    static ActionTypes = {
        save: "save",
        add: "add",
        delete: "delete",
        info: "info",
        close: "close",
        list: "list",
        read: "read",
        examine: "examine",
        giveoffer: "giveoffer",
        edit: "edit"
    };

    /**
     * kaynak tanımları
     */
    static Resources = {
        /**
         * distributor
         */
        distributor: {
            resourceCode: "DISTR",
            actionKeys: [
                CommonTypes.ActionKeys.CreateDistributor,
                CommonTypes.ActionKeys.Refresh
            ]
        },
        /**
         * home
         */
        home: {
            resourceCode: "HOME",
            actionKeys: [
                CommonTypes.ActionKeys.Refresh,
                CommonTypes.ActionKeys.CreateHotel,
                CommonTypes.ActionKeys.Edit
            ],
        },
        /**
         * device
         */
        device: {
            resourceCode: "DEVICE",
            actionKeys: [
                CommonTypes.ActionKeys.Refresh,
                CommonTypes.ActionKeys.CreateDevice,
                CommonTypes.ActionKeys.DeleteDevice
            ],
        },
        /**
         * user
         */
        user: {
            resourceCode: "USER",
            actionKeys: [
                CommonTypes.ActionKeys.Refresh,
                CommonTypes.ActionKeys.CreateUser,
                CommonTypes.ActionKeys.UpdateUser,
                CommonTypes.ActionKeys.ClaimsUser,
                // CommonTypes.ActionKeys.DeleteUser,
            ]
        },
        dashboard: {
            resourceCode: "DASHBOARD",
            actionKeys: []
        },


    };

    /**
     * http response status code
     */
    static ResponseStatusCode = {
        successful: {
            success: 200,
            created: 201,
            accepted: 202,
            nonAuthoritative: 203,
            noContent: 204,
            resetContent: 205,
            partialContent: 206,
        },
        clientError: {
            badRequest: 400,
            unAuthorized: 401,
            paymentRequired: 402,
            forbidden: 403,
            notFound: 404,
            methodNotAllowed: 405,
        },
        serverError: {
            InternalServerError: 500,
            notImplemented: 501,
            badGateway: 502,
            serviceUnavailable: 503,
            gatewayTimeout: 504,
            httpVersionNotSupported: 505,
        },
    };
}

/**
 * aksiyon ismini verir
 * @param key
 * @returns {string}
 */
export function getActionLabel(key) {
    switch (key) {
        case CommonTypes.ActionKeys.CreateDistributor:
            return Messages.ActionNames.createDistributor;
        case CommonTypes.ActionKeys.CreateHotel:
            return Messages.ActionNames.createHotel;
        case CommonTypes.ActionKeys.Save:
            return Messages.ActionNames.save;
        case CommonTypes.ActionKeys.GetList:
            return Messages.ActionNames.getInfo;
        case CommonTypes.ActionKeys.Edit:
            return Messages.ActionNames.edit;
        case CommonTypes.ActionKeys.Close:
            return Messages.ActionNames.close;
        case CommonTypes.ActionKeys.Examine:
            return Messages.ActionNames.examine;
        case CommonTypes.ActionKeys.Read:
            return Messages.ActionNames.read;
        case CommonTypes.ActionKeys.Refresh:
            return Messages.ActionNames.refresh;
        case CommonTypes.ActionKeys.CreateDevice:
            return Messages.ActionNames.createDevice;
        case CommonTypes.ActionKeys.DeleteDevice:
            return Messages.ActionNames.delete;
        case CommonTypes.ActionKeys.CreateUser:
            return Messages.ActionNames.createUser;
        case CommonTypes.ActionKeys.UpdateUser:
            return Messages.ActionNames.updateUser;
        case CommonTypes.ActionKeys.DeleteUser:
            return Messages.ActionNames.delete;
        case CommonTypes.ActionKeys.ClaimsUser:
            return Messages.ActionNames.userClaims;

        default:
            return "action";
    }
}

/**
 * yyyy-mm-dd tarih verir.
 * @returns {*}
 */
export function getDateIsoDate() {
    return dateFormat(new Date(), "isoDate");
}
