import Parameter from "../../Models/Parameter";

export default {
  registerUser: {
    name: "redux-test-user-name",
    isRegistered: false,
  },
  loginUser: {
    userId: -1,
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    token: "",
    expiration: new Date(),
  },
  cityList: [
    {
      name: "Seçiniz",
      cityId: -1,
    },
  ],
  selectedCityId: -1,
  countyList: [
    {
      name: "Seçiniz",
      countyId: -1,
    },
  ],
  parameterList: [initialParameter()],
  jwtObject: {
    token: "",
    expiration: new Date(),
    isSuccess: false,
    isNewPassword: false,
  },
  messageObject: {
    messageType: "",
    message: "",
  },
  actionListInfo: {
    actionKeyList: [],
    resourceCode: "",
  },
  executedAction: {
    onExecute: () => {
      alert("executed redux function");
    },
  },
  backDropStatus: false,
};

function initialParameter() {
  let initialParameter = new Parameter();
  initialParameter.ParamCode = -1;
  initialParameter.ParamType = "no param";
  return initialParameter;
}
