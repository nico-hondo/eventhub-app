import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "login",
    async(user, { rejectWithValue}) => {
        try{
            const data = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(user);
                }, 2000);
            });
            return data;
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
            state.user = null;
            state.isFulfilled = false;
            state.isRejected = false;
            state.error = null;
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
                    state.user = action.payload;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
            })
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;