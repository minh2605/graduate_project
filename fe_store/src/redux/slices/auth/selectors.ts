import { RootState } from "redux/rootReducer";
import { AuthState } from "./authSlice";

export const currentAuthSelector = (state: RootState): AuthState => state.auth;
