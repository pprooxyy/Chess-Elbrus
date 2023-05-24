import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginForm } from "../../../types";
import { setAuthStatus } from "../../slicers/auth.slicer";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: ILoginForm, {dispatch}) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const result = await response.json();
      console.log("result from login thunk: ", result.msg);
      // localStorage.setItem("user", result.user );
      // if (result.msg ===  "Success") {
      //   dispatch(setAuthStatus(true)); // setAuthStatus is an action that updates isAuth in your Redux store
      // }
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);
