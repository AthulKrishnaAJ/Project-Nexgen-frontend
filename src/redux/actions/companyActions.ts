import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginState } from "../../types/common/commonTypes";
import { axiosCompany } from "../../utils/axiosUtil";




export const employerLoginAction = createAsyncThunk('employer/login',
    async({email, password}:LoginState, {rejectWithValue}) => {
        try {
            const response = await axiosCompany.post('/login', {email, password})
            console.log('Response after login submission at companyAction: ', response)
        } catch (error: any) {
            console.error('An error occur in employerLogin action at companyAction: ', error)
            const {data} = error.response
            return rejectWithValue({message: data.message})
        }
    }

)