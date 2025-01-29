import { configureStore, combineReducers } from "@reduxjs/toolkit";
import seekerSlice from './slices/seekerSlice'
import companySlice from './slices/companySlice'
import adminSlice from './slices/adminSlice'

const rootReducers = combineReducers({
    seeker: seekerSlice,
    company: companySlice,
    admin: adminSlice
})

const store = configureStore({
    reducer: rootReducers
})

export default store