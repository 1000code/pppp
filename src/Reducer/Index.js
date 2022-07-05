import { combineReducers } from "redux";
import { country } from "./country";
import { userReducer } from "./UserReducer";

const rootReducer = combineReducers({
  user: userReducer,
  country: country,
});

export default rootReducer;
