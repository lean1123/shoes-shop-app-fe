import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../../api/AuthAPI";

interface ILoginResponse {
  accessToken: string | undefined;
}

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const initialState: ILoginResponse = {
  accessToken: undefined,
};

export const login = createAsyncThunk(
  "/login",
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.login(payload);

      if (response.status.valueOf() !== 200)
        return rejectWithValue(response.data);

      const accessToken = response.data.token;

      localStorage.setItem("accessToken", accessToken);

      return accessToken;
    } catch (error) {
      console.error("Error in login", error);
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "/register",
  async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.register(payload);

      if (response.status.valueOf() !== 200) {
        return rejectWithValue(response.data);
      }

      const accessToken = response.data.token;

      localStorage.setItem("accessToken", accessToken);

      return accessToken;
    } catch (error) {
      console.error("Error in register", error);
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "/logout",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await AuthAPI.logout();

      if (response.status.valueOf() !== 200) {
        return rejectWithValue(response.data);
      }

      localStorage.removeItem("accessToken");

      return response.data;
    } catch (error) {
      console.error("Error in logout", error);
      return rejectWithValue(error);
    }
  }
);

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // logout: (state) => {
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("jwt");
    //   state.current = {};
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        console.error("Error in register", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        console.error("Error in login", action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = undefined;
      })
      .addCase(logout.rejected, (state, action) => {
        console.error("Error in logout", action.payload);
      });
  },
});

// export const { logout } = AuthSlice.actions;

export const authreducer = AuthSlice.reducer;
