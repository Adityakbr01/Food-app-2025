import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/Redux/Slice/data/userSlice";
import { UserApiSlice } from "@/Redux/Slice/UserApiSlice";

const rootReducer = combineReducers({
  [UserApiSlice.reducerPath]: UserApiSlice.reducer,
  auth: userReducer, // User slice add kiya
});

export default rootReducer;
