export  class Action {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}

export  class ResourceContract {
  resourceId;
  resourceCode;
  parentCode;
  name;
  descrption;
  iconKey;
  path;
  parentName;
  
  actionList;
}

export  class ResourceActionContract extends ResourceContract{
actionId;
actionName;
actionKey;
}

