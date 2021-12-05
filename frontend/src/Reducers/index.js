import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";
import popUpReducer from "./popUp";
import requestPopUpReducer from "./requestPopUp";
const allReducers = combineReducers({
    loginReducer,
    popUpReducer,
    requestPopUpReducer
})

export default allReducers;

