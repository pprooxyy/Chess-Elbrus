import { createSlice } from "@reduxjs/toolkit";
import { IProfileState } from "../../types";
import { getUserGames } from "../thunk/profile/getUserGames";

const initialUserStats = {
  total: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  totalDuration: 0,
};

const initialState: IProfileState = {
  userGames: [],
  userStats: initialUserStats,
  isLoading: false,
  error: null,
};

const profileSlicer = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserGames.fulfilled, (state, action) => {
        state.userGames = action.payload.userGames;
        state.userStats = action.payload.userStats;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserGames.rejected, (state, action) => {
        state.userGames = [];
        state.userStats = initialUserStats;
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlicer.reducer;
