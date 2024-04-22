// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postREducer from "./post/postSlice";
import profileReducer from "./profile/profileSlice";
import messageREducer from "./message/messageSlice";
import followReducer from "./follow/followSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postREducer,
  profile: profileReducer,
  message: messageREducer,
  follow: followReducer,
});

export default rootReducer;
