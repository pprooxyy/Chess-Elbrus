import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout, setAuthStatus } from "../../slicers/auth.slicer";


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async(user, {dispatch})=> {
    try {
      const response = await fetch("http://localhost:3001/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      
        dispatch(logout()); // setAuthStatus is an action that updates isAuth in your Redux store
      
      return result;
    } catch (error) {
      console.log(error);
    }
  }
)