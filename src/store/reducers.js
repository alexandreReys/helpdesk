import { combineReducers } from "redux";
import defaultReducer from "./reducers/defaultReducer";
import loginReducer from "./reducers/loginReducer";
import chamadasReducer from "./reducers/chamadasReducer";
import clientesReducer from "./reducers/clientesReducer";

export default combineReducers({
  defaultState: defaultReducer,
  loginState: loginReducer,
  chamadasState: chamadasReducer,
  clientesState: clientesReducer,
});
