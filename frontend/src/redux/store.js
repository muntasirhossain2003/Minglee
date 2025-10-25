import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
});

export default store;
