import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "redux/slices/auth/authSlice";
import cartReducer from "redux/slices/cart/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
