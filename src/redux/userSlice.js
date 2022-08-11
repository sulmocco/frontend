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
    },
    userLogout(state, action) {
      state.isLogin = false;
      state.username = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
