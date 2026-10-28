import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchUrl from "../../components/utils/fetchUrl";

const initialState = {
  userProfile: null,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const fetchProfileUser = createAsyncThunk(
  "user/profileUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().activeState.token;
      if (!token) {
        localStorage.clear();
        return rejectWithValue("token tidak ada, silahkan login ulang");
      }

      const url = `${BASE_URL}/user/my-profile`;
      const response = await fetchUrl(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      return response?.Data || response;
    } catch (error) {
      return rejectWithValue(error.message || "failed get my profile");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileUser.pending, (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
      })
      .addCase(fetchProfileUser.fulfilled, (state, action) => {
        state.isPending = false;
        state.isFulfilled = true;
        state.userProfile = action.payload;
      })
      .addCase(fetchProfileUser.rejected, (state, action) => {
        state.isPending = false;
        state.isRejected = true;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;