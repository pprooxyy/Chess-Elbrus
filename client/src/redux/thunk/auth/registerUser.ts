import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRegisterForm } from "../../../types";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (inputValues: IRegisterForm) => {
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
      console.log("result from register thunk: ", result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);
