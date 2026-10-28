import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchUrl from "../../components/utils/fetchUrl";

const initialState = {
    registeredUser: [],
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
};

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const registerThunk = createAsyncThunk(
    "register",
    async (newUser, {rejectWithValue}) => {
        try{
            const url = `${BASE_URL}/auth/register`;
            const result = await Promise.all([ 
                fetchUrl(url, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newUser)
                }),
                new Promise((resolve) => setTimeout(resolve, 2000))
            ]);
            return result?.Data || [];
        }catch(error){
            return rejectWithValue(error.message || "Registration Failed");
        }
    },
);

export const resetPasswordThunk = createAsyncThunk(
    "resetPassword",
    async ({newPass}, { getState, rejectWithValue }) => {
        try{
            const { forgotPasswordState } = getState();
            const userForgot = forgotPasswordState.email;

            const data = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ newPass, userForgot });
                }, 2000);
            });
            return data;
        } catch(error) {
            return rejectWithValue(error.message || "Reset Password Failed");
        }
    }
);

export const joinEventThunk = createAsyncThunk(
    "events/joinEvent",
    async ({ eventId }, { getState, rejectWithValue }) => {
        try {
            const token = getState().activeState.token;
            // console.log("token:", token);

            if (!token) {
                return rejectWithValue("Token tidak ada, silakan login ulang");
            }

            const url = `${BASE_URL}/events/${eventId}/join`;
            const [response] = await Promise.all([
                fetchUrl(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }),
                new Promise((resolve) => setTimeout(resolve, 1500))
            ]);

            return { eventId, data: response?.Data || response };
        } catch (error) {
            return rejectWithValue(error.message || "Failed to join event");
        }
    }
);

export const joinCommunityThunk = createAsyncThunk(
    "joinCommunity",
    async (communityData, {rejectWithValue}) => {
        try{
            const data = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(communityData);
                }, 1000);
            });
            // const url = `http://localhost:8000/events/${communityData.eventId}`;
            //  const result = await Promise.all([ 
            //     fetchUrl(url, {
            //         method: "POST",
            //         headers: {"Content-Type": "application/json"},
            //         body: JSON.stringify(communityData)
            //     }),
            //     new Promise((resolve) => setTimeout(resolve, 2000))
            // ]);
            return data;
        }catch(error){
            return rejectWithValue(error.message || "Failed to join community");
        }
    }
)

export const updateProfileThunk = createAsyncThunk(
    "user/updateProfile",
    async (communityData, {rejectWithValue}) => {
        try{
            const data = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(communityData);
                }, 1000);
            });
            return data;
        }catch(error){
            return rejectWithValue(error.message || "Failed to join community");
        }
    }
)

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
                    if(action.payload){
                        state.registeredUser.push(action.payload);
                    }
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                },
            })
            .addAsyncThunk(resetPasswordThunk, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    const { newPass, userForgot } = action.payload;

                    const user = state.registeredUser.find((user) => user.email === userForgot);
                    
                    state.isPending = false;

                    if(user){
                        user.password = newPass;
                        state.isFulfilled = true;
                    }else{
                        state.isRejected = true;
                        state.error = "User not found";
                    }
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
            })
            .addAsyncThunk(joinEventThunk, {
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
            .addAsyncThunk(joinCommunityThunk, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    const { communityId, userEmail } = action.payload;

                    const user = state.registeredUser.find((user) => user.email === userEmail);

                    const joinedCommunity = user.community_id.includes(communityId);

                    if(joinedCommunity){
                        user.community_id = user.community_id.filter((id) => id !== communityId);
                    }else{
                        user.community_id.push(communityId);
                    }

                    state.isPending = false;
                    state.isFulfilled = true;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
                
            })
            .addAsyncThunk(updateProfileThunk, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                },
                fulfilled: (state, action) => {
                    const { userEmail, name, img } = action.payload;

                    const user = state.registeredUser.find((user) => user.email === userEmail);

                    state.isPending = false;

                    if (user) {
                        user.img = img;
                        user.name = name; // merge nama/location/bio/avatar yg berubah
                        state.isFulfilled = true;
                    } else {
                        state.isRejected = true;
                        state.error = "User not found";
                    }

                    state.isPending = false;
                    state.isFulfilled = true;
                },
                rejected: (state, action) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = action.payload;
                }
                
            })
    }
})

export default userSlice.reducer;