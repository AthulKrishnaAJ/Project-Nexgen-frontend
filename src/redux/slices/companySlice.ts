import { createSlice } from "@reduxjs/toolkit"
import { EmployerPrimaryState } from "../../types/company/comapanyInterfaces"
import { employerLoginAction } from "../actions/companyActions"


const initialState: EmployerPrimaryState = {
    employerInfo: null
}


const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        clearCompanyState: (state) => {
            state.employerInfo = null
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(employerLoginAction.fulfilled, (state, action) => {
                state.employerInfo = action.payload?.employerData
                console.log('Employer data at companySlice: ', state.employerInfo)
            })
    }
})


export default companySlice.reducer