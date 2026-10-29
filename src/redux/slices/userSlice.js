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

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      const token = getState().activeState.token;
      if (!token) {
        return rejectWithValue("Token tidak ditemukan, silakan login kembali");
      }

      const url = `${BASE_URL}/auth/change-password`; 
      const response = await fetchUrl(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword
        })
      });

      return response?.Msg || response?.message || "Password berhasil diubah!";
    } catch (error) {
      return rejectWithValue(error.message || "Gagal mengubah password");
    }
  }
);

export const updateProfileUser = createAsyncThunk(
  "user/updateProfile",
  async ({ name, location, bio, fileAvatar }, { getState, rejectWithValue }) => {
    try {
      const token = getState().activeState.token;
      if (!token) {
        return rejectWithValue("token tidak ditemukan, silahkan login ulang");
      }

      const formData = new FormData();
      
      if (name) formData.append("name", name);     
      if (location) formData.append("location", location);  
      if (bio) formData.append("bio", bio);  
      if (fileAvatar) formData.append("avatar_url", fileAvatar);

      const url = `${BASE_URL}/user/change-profile`;
      
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.Msg || result.message || "Gagal mengupdate profil");
      }

      return result?.Msg || result?.message || "Profile updated successfully";
    } catch (error) {
      return rejectWithValue(error.message || "failed update profile");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    return builder
      .addAsyncThunk(fetchProfileUser, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
        },
        fulfilled: (state, action) => {
          state.isPending = false;
          state.isFulfilled = true;
          state.userProfile = action.payload;
        },
        rejected: (state, action) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = action.payload;
        }
      })
      .addAsyncThunk(changePassword, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
        },
        fulfilled: (state) => {
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, action) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = action.payload;
        }
      })
      .addAsyncThunk(updateProfileUser, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
        },
        fulfilled: (state) => {
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, action) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = action.payload;
        }
      });
  },
});

export default userSlice.reducer;