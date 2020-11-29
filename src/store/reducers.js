import { combineReducers } from "redux";
import defaultReducer from "./reducers/defaultReducer";
import loginReducer from "./reducers/loginReducer";
import chamadasReducer from "./reducers/chamadasReducer";

export default combineReducers({
  defaultState: defaultReducer,
  loginState: loginReducer,
  chamadasState: chamadasReducer,
});
