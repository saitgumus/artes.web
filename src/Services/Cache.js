const LRU = require("lru-cache");

export default class Cache {
  static lru = new LRU({ max: 100, maxAge: 1000 * 60 * 60 * 24 });

  static getParameter = (paramType) => {
    let key = "prm_" + paramType;
    if (Cache.lru.has(key)) {
      return Cache.lru.get(key);
    } else {
      return undefined;
    }
  };

  static setParameter(paramType, value) {
    let key = "prm_" + paramType;
    if (!Cache.lru.has(key)) {
      return Cache.lru.set(key, value);
    } else {
      return 0;
    }
  }
  
  static setItem(key,value){
    if (!Cache.lru.has(key)){
      return Cache.lru.set(key, value);
    }else {
      return 0;
    }
  }

  /**
   * daha önce varsa üzerine yaz
   * @param key
   * @param value
   * @returns {boolean}
   */
  static overrideItem(key,value){
      return Cache.lru.set(key, value);
  }
  
  static getItem(key){
    return Cache.lru.get(key);
  }
}
