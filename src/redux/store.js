import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

import authReducer from './slices/authSlice';
import registReducer from './slices/registerSlice';
import forgotPasswordReducer from './slices/forgotPassSlice';
import eventReducer from './slices/eventSlice';
import communityReducer from './slices/communitySlice';
import testimonyReducer from './slices/testiSlice';
import notifReducer from './slices/notifSlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const storage = {
    getItem: (key) => {
        return Promise.resolve(window.localStorage.getItem(key));
    },
    setItem: (key, value) => {
        return Promise.resolve(window.localStorage.setItem(key, value));
    },
    removeItem: (key) => {
        return Promise.resolve(window.localStorage.removeItem(key));
    },
};

const persistAuthConfig = {
    key: 'session',
    storage,
    whitelist: ['token', 'user', 'isAuthenticated'], //simpan field ini secara otomatis
};

const persistRegistConfig = {
    key: 'users',
    storage,
    // whitelist: ['registeredUser'],
}

const store = configureStore({
    reducer: {
        activeState: persistReducer(persistAuthConfig, authReducer),
        registState: persistReducer(persistRegistConfig, registReducer),
        forgotPasswordState: forgotPasswordReducer,
        events: eventReducer,
        community: communityReducer,
        testimony: testimonyReducer,
        notification: notifReducer,
    },
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export default store;