import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "api/user/login",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/api/users/get-user");
      const { userDB } = data;

      if (userDB) {
        // navigate("/find-mentor");
        // const { error } = UserJoi.validate(user);
        // if (error) throw error;
        return userDB;
      }
    } catch (error:any) {
        console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
);
