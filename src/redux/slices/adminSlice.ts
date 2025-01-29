import { createSlice } from "@reduxjs/toolkit";
import { AdminPrimaryState } from "../../types/admin/adminInterfaces";
import { adminLoginAction } from "../actions/adminActions";



const initialState: AdminPrimaryState = {
    adminInfo: null
}


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminLoginAction.fulfilled, (state, action) => {
                state.adminInfo = action.payload?.adminData
            })
    }
})

export default adminSlice.reducer