import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./slicers/auth.slicer";
import profileSlicer from "./slicers/profile.slicer";
import leaderSlice from "./slicers/leaders.slicer";
import mainPageSlicer from "./slicers/mainPage.slicer";

export const store = configureStore({
  reducer: { authSlicer, profileSlicer, leaderSlice, mainPageSlicer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
