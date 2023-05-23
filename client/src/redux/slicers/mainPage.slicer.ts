import { createSlice } from "@reduxjs/toolkit";
import { getChessComLeaders } from "../thunk/mainPage/getChessComLeaders";
import { IChessComState } from "../../types";

const initialState: IChessComState = {
  leaderboard: [],
  isLoading: false,
  error: null,
};

const mainPageSlicer = createSlice({
  name: "mainPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChessComLeaders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChessComLeaders.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getChessComLeaders.rejected, (state, action) => {
        state.leaderboard = [];
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default mainPageSlicer.reducer;
