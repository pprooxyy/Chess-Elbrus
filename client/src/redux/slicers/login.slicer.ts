import { createSlice } from "@reduxjs/toolkit";
import { ILoginForm, ILoginState } from "../../types";
import { loginUser } from "../thunk/auth/loginUser";

const initialUser: ILoginForm = {
  user_email: "",
  user_password: "",
};

const initialState: ILoginState = {
  user: initialUser,
  isAuthenticated: false,
  isLoading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = initialUser;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export default loginSlice.reducer;
