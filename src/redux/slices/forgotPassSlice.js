import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
};

export const forgotPasswordThunk = createAsyncThunk(
    "forgotPassword",
    async (email, { rejectWithValue }) => {
        try {
            const data = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (!email || !email.includes("@")) {
                        reject(new Error("Email tidak valid"));
                        return;
                    }
                    
                    resolve(email);
                }, 2000);
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Gagal mengirim link reset password");
        }
    }
);

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers: {
        resetForgotPasswordState: (state) => {
            state.isPending = false;
            state.isFulfilled = false;
            state.isRejected = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        return builder
            .addAsyncThunk(forgotPasswordThunk, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                    state.error = null;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.email = action.payload;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
            });
    },
});

export const { resetForgotPasswordState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;