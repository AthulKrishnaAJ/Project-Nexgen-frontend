import { createSlice } from "@reduxjs/toolkit";
import { AdminPrimaryState } from "../../types/admin/adminInterfaces";
import { adminLoginAction } from "../actions/adminActions";



const initialState: AdminPrimaryState = {
    adminInfo: null
}


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearAdminState: (state) => {
            state.adminInfo = null
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLoginAction.fulfilled, (state, action) => {
                state.adminInfo = action.payload?.adminData
                console.log('admin datas: ', state.adminInfo)
            })
    }
})
export const {clearAdminState} = adminSlice.actions
export default adminSlice.reducer