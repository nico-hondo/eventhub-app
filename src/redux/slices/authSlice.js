import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchUrl from "../../components/utils/fetchUrl";

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "login",
    async(user, { rejectWithValue}) => {
        try{
            const url = "http://localhost:8000/auth/login";
            const result = await Promise.all([
                fetchUrl(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                }),
                new Promise((resolve) => setTimeout(resolve, 2000))
            ]);
            
            return result[0]?.Data || []
        }catch (error){
            return rejectWithValue(error.message || "Login Gagal");
        }
    }
)

const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isPending = false;
            state.isFulfilled = false;
            state.isRejected = false;
            state.error = null;
            //redux-persist menghapus otomatis
        },
    },
    extraReducers: (builder) => {
        return builder
            .addAsyncThunk(loginUser, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.isAuthenticated = true;
                    state.token = action.payload?.token || null;
                    state.user = action.payload?.user || null;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
            })
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;