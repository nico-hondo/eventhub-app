import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchUrl from "../../components/utils/fetchUrl";

const initialState = {
    testimony: [],
    error: null,
}

export const fetchTestimony = createAsyncThunk(
    "testimony",
    async(_, {rejectWithValue}) => {
        try{
            const url = "http://localhost:8000/testimony";
            const result = await fetchUrl(url);
            return result?.Data || [];
        }catch(err){
            return rejectWithValue(err.message || "failed fetch testimony");
        }
    }
)

const testimonySlice = createSlice({
    name: "testimony",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        return builder
            .addAsyncThunk(fetchTestimony, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.testimony = action.payload;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.error = action.payload;
                }
            })
    }
});

export default testimonySlice.reducer;