import { configureStore, combineReducers } from "@reduxjs/toolkit";
import seekerSlice from './slices/seekerSlice'
import companySlice from './slices/companySlice'

const rootReducers = combineReducers({
    seeker: seekerSlice,
    company: companySlice
})

const store = configureStore({
    reducer: rootReducers
})

export default store