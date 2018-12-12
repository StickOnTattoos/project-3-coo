import { combineReducers } from "redux";
import { reducer as burgerMenu } from "redux-burger-menu";
import auth from "../actions/auth";
import counter from "../actions/counter";
import phrase from "../actions/fetchPhrase";
import videos from "../actions/videos";

export default combineReducers({
  auth,
  burgerMenu,
  counter,
  phrase,
  videos
});
