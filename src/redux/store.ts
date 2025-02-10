import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

import seekerSlice from './slices/seekerSlice'
import companySlice from './slices/companySlice'
import adminSlice from './slices/adminSlice'


const persistConfig = {
    key: 'root',
    storage
}

const rootReducers = combineReducers({
    seeker: seekerSlice,
    company: companySlice,
    admin: adminSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducers)



const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
    
})
export const persistor = persistStore(store)
export default store