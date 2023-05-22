import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRegisterForm } from "../../../types";
import { setAuthStatus } from "../../slicers/auth.slicer";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (inputValues: IRegisterForm, {dispatch}) => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inputValues),
      });
      const result = await response.json();
      localStorage.setItem("user", JSON.stringify(result.user));
      //localStorage.setItem("userName", userName);
      console.log("result from register thunk: ", result);
      if (result.msg ===  "User registered successfully") {
        dispatch(setAuthStatus(true)); // setAuthStatus is an action that updates isAuth in your Redux store
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);
