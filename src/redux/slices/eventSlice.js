import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import fetchUrl from "../../components/utils/fetchUrl";

const initialState = {
    events: [],
    eventDetail: null,
    myEvents: [],
    saved_events: [],
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
}

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchEvents = createAsyncThunk(
    "events",
    async(params={}, {rejectWithValue}) => {
        try{
            const {search = "", location = "", category = ""} = params;

            // Menggunakan URLSearchParams
            const query = new URLSearchParams();
            if (search) query.append("search", search);
            if (location) query.append("location", location);
            if (category) query.append("category", category);

            // Jika semua kosong, maka URL hanya sampai event, tidak menggunakan params sama sekali.
            const url = `${BASE_URL}/events${query.toString() ? `?${query.toString()}` : ""}`; 
            
            const result = await fetchUrl(url);
            return result?.Data || [];
            
        }catch(err){
            return rejectWithValue(err.message || "failed fetching");
        }
    }
);

export const fetchEventById = createAsyncThunk(
    "eventById",
    async(id, {rejectWithValue}) => {
        try{
            const url = `${BASE_URL}/events/${id}`;
            const result = await fetchUrl(url);
            return result?.Data || [];
        }catch(err){
            return rejectWithValue(err.message || "failed fetch fetching");
        }
    }
)

export const fetchMyEvents = createAsyncThunk(
    "myEvents",
    async(_, {getState, rejectWithValue}) => {
        try{
            const token = getState().activeState.token;
            if (!token){
                localStorage.clear();
                return rejectWithValue("token tidak ada, silahkan login ulang")
            }
            const url = `${BASE_URL}/events/myevents`;
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
            return response?.Data || response || [];
        } catch(error){
            return rejectWithValue(error.message || "failed get my events");
        }
    }
)

export const saveEventThunk = createAsyncThunk(
    "events/saveEvent",
    async ({ eventId }, { getState, rejectWithValue }) => {
        try {
            const token = getState().activeState.token;
            const url = `${BASE_URL}/events/${eventId}/save`;

            const [response] = await Promise.all([
                fetchUrl(url, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }),
                new Promise((resolve) => setTimeout(resolve, 2000))
            ]);

            return { eventId, data: response?.Data || response };
        } catch (error) {
            return rejectWithValue(error.message || "Failed to save event");
        }
    }
);
export const fetchSavedEvents = createAsyncThunk(
    "saved-events",
    async(_, {getState, rejectWithValue}) => {
        try{
            const token = getState().activeState.token;
            if (!token){
                localStorage.clear();
                return rejectWithValue("token tidak ada, silahkan login ulang")
            }
            const url = "${BASE_URL}/events/saved-events";
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
            console.log("fetch events saved:", response);

            return response?.Data || response || [];
        } catch(error){
            return rejectWithValue(error.message || "failed get my events");
        }
    }
)

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        return builder
            .addAsyncThunk(fetchEvents,{
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.events = action.payload;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
            })
            .addAsyncThunk(fetchEventById, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.eventDetail = action.payload;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
            })
            .addAsyncThunk(fetchMyEvents, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.myEvents = action.payload;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
            })
            .addAsyncThunk(saveEventThunk, {
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
            .addAsyncThunk(fetchSavedEvents, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                    state.saved_events = action.payload;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
            })
    },
});

export default eventSlice.reducer;