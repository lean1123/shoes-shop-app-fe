import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/(auth)/AuthSlice";

const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export default store;
