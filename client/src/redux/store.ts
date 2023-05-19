import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./slicers/auth.slicer";
// import loginSlice from "./slicers/login.slicer";

export const store = configureStore({
  reducer: { authSlicer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
