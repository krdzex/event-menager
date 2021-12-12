import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";
import popUpReducer from "./popUp";

const allReducers = combineReducers({
    loginReducer,
    popUpReducer,

})

export default allReducers;

