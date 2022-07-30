import Messages from "./Messages";
const dateFormat = require("dateformat");

/**
 * common types for general components
 */
export class CommonTypes {
  static URLaddress = "http://srv341.heyloki.com:5010"; //23163 - api, 5001 - gateway
  static KafkaHost = "http://167.172.180.44:9092";
  static KafkaTopic = "apmantest";
  static RabbitMQ = "http://167.172.180.44:5672";
  static RabbitMQTopicName = "apman-client";

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
  static GetUrlForAccount(controllerName, actionName) {
    return this.URLaddress.concat(
      "/accounting/",
      controllerName.trim(),
      "/",
      actionName.trim()
    );
  }
  static GetUrlForPurchasing(controllerName, actionName) {
    return this.URLaddress.concat(
      "/purchasing/",
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
    refresh:"refresh"
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
    Refresh:"REFRESH",
    /** create distributor */
    CreateDistributor:"CREATEDIST",
    /** create a hotel */
    CreateHotel:"CREATEHOTEL",
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
    edit:"edit"
  };

  /**
   * kaynak tanımları
   */
  static Resources = {
    /**
     * distributor
     */
    distributor:{
      resourceCode:"DISTR",
      actionKeys:[
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
        CommonTypes.ActionKeys.CreateHotel,
        CommonTypes.ActionKeys.Refresh,
        CommonTypes.ActionKeys.Edit
      ],
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
