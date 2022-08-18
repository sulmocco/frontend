import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.isLogin = true;
      state.username = action.payload?.username;
      localStorage.setItem("token", action.payload?.token)
      localStorage.setItem("username", action.payload?.username)
    },
    userLogout(state, action) {
      state.isLogin = false;
      state.username = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
