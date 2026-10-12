import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import fetchUrl from "../../components/utils/fetchUrl";

const initialState = {
    notif: [],
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
}

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchNotification = createAsyncThunk(
    "notifications",
    async(_, {getState, rejectWithValue}) => {
        try{
            const token = getState().activeState.token;
            if (!token){
                localStorage.clear();
                return rejectWithValue("token tidak ada, silahkan login ulang")
            }
            const url = `${BASE_URL}/my-notification`;
            const [response] = await Promise.all([
                fetchUrl(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }),
                new Promise((resolve) => setTimeout(resolve, 2000))
            ]);
            // console.log("fetch notification:", response);

            return response?.Data || response || [];
        } catch(error){
            return rejectWithValue(error.message || "failed get my events");
        }
    }
)

const notifSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        return builder
            .addAsyncThunk(fetchNotification,{
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.notif = action.payload;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
            })
        }
})

export default notifSlice.reducer;