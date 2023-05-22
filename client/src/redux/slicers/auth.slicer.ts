import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../types";
import { getUser } from "../thunk/auth/getUser";
import { registerUser } from "../thunk/auth/registerUser";
import { loginUser } from "../thunk/auth/loginUser";
import { editUser } from "../thunk/auth/editUser";

const initialUser = {
  id: 0,
  user_name: "",
  user_rating: 0,
  user_avatar: "",
};

const initialState: IAuthState = {
  user: initialUser,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  msg: "",
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setUser(state, action) {
    //   state.user = action.payload;
    // },
    // delUser(state) {
    //   state.user = initialUser;
    // },
    setAuthStatus(state, action){
      state.isAuthenticated = action.payload.isAuthenticated;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        state.msg = action.payload.msg;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = initialUser;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.error.message;
        state.msg = "";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        state.msg = action.payload.msg;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = initialUser;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.error.message;
        state.msg = "";
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload; //!
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = initialUser;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        // state.user = action.payload;
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const {setAuthStatus} = authSlicer.actions;
export default authSlicer.reducer;
