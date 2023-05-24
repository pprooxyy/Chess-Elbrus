import { createSlice } from "@reduxjs/toolkit";
import { IProfileState } from "../../types";
import { getUserGames } from "../thunk/profile/getUserGames";

const initialProfileOwner = {
  id: 0,
  user_name: "",
  user_rating: 0,
  user_avatar: "",
};

const initialUserStats = {
  total: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  totalDuration: 0,
};

const initialState: IProfileState = {
  profileOwner: initialProfileOwner,
  userGames: [],
  userFriends: [],
  userStats: initialUserStats,
  isLoading: false,
  error: null,
};

const profileSlicer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileOwner(state, action) {
      state.profileOwner = action.payload;
    },
    delFriend(state, action) {
      state.userFriends = state.userFriends.filter((friend) => {
        if (friend.id !== action.payload) {
          return friend;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserGames.fulfilled, (state, action) => {
        state.profileOwner = action.payload.profileOwner;
        state.userGames = action.payload.userGames;
        state.userStats = action.payload.userStats;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserGames.rejected, (state, action) => {
        state.profileOwner = initialProfileOwner;
        state.userGames = [];
        state.userStats = initialUserStats;
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProfileOwner, delFriend } = profileSlicer.actions;
export default profileSlicer.reducer;
