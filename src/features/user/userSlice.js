import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: null,
  userInfo: null,
};

const config = {
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
  },
};

export const login = createAsyncThunk(
  "user/login",
  async ({username, password}) => {

    try{
      const response = await axios.post("https://store-api-o6m1.onrender.com/v1/login",{ username, password }, config);
      console.log(response.status)  
      return response.data;
    } catch(err){
      return err.message
    }
    
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userInfo = null;
      state.success = false
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(login.pending, (state, action) => {
    //   state.loading = true;
    // });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Login Successful";
      state.userInfo = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.userInfo = null;
      state.error = action.payload
    });
  },
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;


