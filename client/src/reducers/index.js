import { combineReducers } from "redux";
import user from "./userReducer";
import chat from "./chatReducer";
const reducer = combineReducers({
  chat,
  user,
});
export default reducer;
