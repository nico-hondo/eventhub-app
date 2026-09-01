import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    registeredUser: [],
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
};

export const registerThunk = createAsyncThunk(
    "register",
    async (newUser, {rejectWithValue}) => {
        try{
            const data = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(newUser);
                }, 2000);
            });
            return data;
        }catch(error){
            return rejectWithValue(error.message || "Registrasi Gagal");
        }
    },
);

const userSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        return builder
            .addAsyncThunk(registerThunk, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.registeredUser.push(action.payload);
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                },
            })
    }
})

export default userSlice.reducer;