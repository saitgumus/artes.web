import { combineReducers } from "redux";
import loginReducer from "./login-reducer";
import cityReducer from "./city-county-reducer";
import countyReducer from "./county-reducer";
import parameterReducer from "./parameter-reducer";
import registerReducer from "./register-reducer";
import changeLoginStatusReducer from "./change-login-status-reducer";
import showMessageReducer from "./message-reducer";
import changeSelectedCityReducer from "./change-selected-city-reducer";
import defineBlockReducer from "./definingReducers/define-block-reducer";
import actionListReducer from "./actionReducers/action-list-reducer";
import actionExecuteReducer from "./actionReducers/action-execute-reducer";
import backdropStatusReducer from "./actionReducers/change-backdrop-status-reducer";
import changeLoginToNewPasswordReducer from "./change-login-new-password-reducer";

const rootReducer = combineReducers({
  loginReducer,
  cityReducer,
  countyReducer,
  parameterReducer,
  registerReducer,
  changeLoginStatusReducer,
  showMessageReducer,
  changeSelectedCityReducer,
  defineBlockReducer,
  actionListReducer,
  actionExecuteReducer,
  backdropStatusReducer,
  changeLoginToNewPasswordReducer,
});

export default rootReducer;
