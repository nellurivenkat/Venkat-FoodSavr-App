import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { postDataAPI } from "../api";

const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

// Thunk to register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await postDataAPI("/register", userData);
      console.log(response.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.user));
      await AsyncStorage.setItem("token", response.token);
      return response.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await postDataAPI("/login", userData);
      await AsyncStorage.setItem("user", JSON.stringify(response.user));
      await AsyncStorage.setItem("token", response.token);
      console.log(response.user);
      return response.user;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("token");
});

export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (email, { rejectWithValue }) => {
    try {
      await postDataAPI("/sendVerificationEmail", { email });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyVerificationCode = createAsyncThunk(
  "auth/verifyVerificationCode",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await postDataAPI("/verifyVerificationCode", {
        email,
        code,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ token, email, newPassword }, { rejectWithValue }) => {
    try {
      await postDataAPI("/updatePassword", { token, email, newPassword });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
