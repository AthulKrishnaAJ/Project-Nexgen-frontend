import { configureStore } from "@reduxjs/toolkit";
import seekerSlice from './slices/seekerSlice'


const store = configureStore({
    reducer: seekerSlice
})

export default store