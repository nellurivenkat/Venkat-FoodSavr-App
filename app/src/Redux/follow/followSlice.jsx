// followSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
};

export const followUser = createAsyncThunk(
  "follow/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.post(`/follow/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "follow/unFollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.post(`/unfollow/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unFollowUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unFollowUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unFollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default followSlice.reducer;
