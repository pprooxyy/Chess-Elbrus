import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../types";
import { getUser } from "../thunk/auth/getUser";
import { registerUser } from "../thunk/auth/registerUser";

const initialUser = {
  id: 0,
  user_name: "",
  user_rating: 0,
};

const initialState: IAuthState = {
  user: initialUser,
  loading: false,
  error: null,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    delUser(state) {
      state.user = initialUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = initialUser;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = initialUser;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlicer.reducer;
