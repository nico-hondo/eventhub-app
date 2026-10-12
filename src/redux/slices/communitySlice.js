import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import fetchUrl from "../../components/utils/fetchUrl";

const initialState = {
    community: [],
    communityDetail: null,
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
}

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchCommunity = createAsyncThunk(
    "community",
    async(_, {rejectWithValue}) => {
        try{
            const url = `${BASE_URL}/community`;
            const result = await fetchUrl(url);
            return result?.Data || [];
        }catch(err){
            return rejectWithValue(err.message || "failed fetching"
            )
        }
    }
);

export const fetchCommunityById = createAsyncThunk(
    "communityById",
    async(id, {rejectWithValue}) => {
        try{
            const url = `${BASE_URL}/community/${id}`;
            const result = await fetchUrl(url);
            return result?.Data || [];
        }catch (err){
            return rejectWithValue(err.message || "failed fetching")
        }
    }
)

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        return builder
            .addAsyncThunk(fetchCommunity, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.community = action.payload;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.error = action.payload
                }
            })
            .addAsyncThunk(fetchCommunityById, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.communityDetail = action.payload;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.error = action.payload
                }
            })
    },
});

export default communitySlice.reducer;