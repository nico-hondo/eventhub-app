import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

import authReducer from './slices/authSlice';
import registReducer from './slices/registerSlice';
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
    whitelist: ['user'],
};

const persistRegistConfig = {
    key: 'users',
    storage,
    whitelist: ['registeredUser'],
}

const store = configureStore({
    reducer: {
        activeState: persistReducer(persistAuthConfig, authReducer),
        registState: persistReducer(persistRegistConfig, registReducer),
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
