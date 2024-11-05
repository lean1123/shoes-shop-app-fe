import { createSlice } from "@reduxjs/toolkit";

export const register = createAsyncThunk("/register", async (payload) => {
  try {
    const { user, token } = await UserService.register(payload);
    localStorage.setItem("jwt", token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Error in register", error);
  }
});

export const login = createAsyncThunk("/login", async (payload) => {
  try {
    const { user, token } = await UserService.login(payload);

    console.log("user", user);

    localStorage.setItem("jwt", token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Error in login", error);
  }
});

const AuthSlice = createSlice({
  name: "users",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || {},
    setting: {},
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");

      state.current = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
