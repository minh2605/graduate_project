import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "redux/store";
import { CurrentUserProfile } from "types/auth";

export type AuthState = {
  isLoggedIn: boolean;
  currentUserProfile: CurrentUserProfile | null;
};

const authInfo = localStorage.getItem("authInfo");

const initialState: AuthState = authInfo
  ? JSON.parse(authInfo)
  : {
      isLoggedIn: false,
      currentUserProfile: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn(state) {
      state.isLoggedIn = true;
    },
    setCurrentUser(state, action: PayloadAction<CurrentUserProfile>) {
      state.currentUserProfile = action.payload;
    },
    resetAuth() {
      return {
        isLoggedIn: false,
        currentUserProfile: null,
      };
    },
  },
});

const { setLoggedIn, setCurrentUser, resetAuth } = authSlice.actions;

export const clearAuth = (): AppThunk => (dispatch) => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("jwt_refresh_token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("authInfo");
  dispatch(resetAuth());
  return;
};

export { setCurrentUser, setLoggedIn };

const authReducer = authSlice.reducer;
export default authReducer;
