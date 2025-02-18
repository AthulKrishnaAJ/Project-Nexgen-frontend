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
        },
        updateCompanyToken: (state, action) => {
            if(state.employerInfo){
                state.employerInfo.accessToken = action.payload
            }
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

export const {clearCompanyState, updateCompanyToken} = companySlice.actions
export default companySlice.reducer