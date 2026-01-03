import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  status: string;
  lastLoginAt: string;
}

interface AuthenticationState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: AuthUser | null;
}

interface PayloadActionData {
  user: AuthUser;
  accessToken: string;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<PayloadActionData>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    update: (state, action: PayloadAction<Partial<PayloadActionData>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload.user,
        };
      }
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout, update } = authSlice.actions;
export default authSlice.reducer;
