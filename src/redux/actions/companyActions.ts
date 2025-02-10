import { createAsyncThunk } from "@reduxjs/toolkit";
import { EmailWithPasswordState } from "../../types/common/commonTypes";
import { axiosCompany } from "../../utils/axiosUtil";
import httpStatus from "../../utils/httpStatus";




export const employerLoginAction = createAsyncThunk('company/login',
    async({email, password}:EmailWithPasswordState, {rejectWithValue}) => {
        try {
            const response = await axiosCompany.post('/login', {email, password})
            console.log('Response after login submission at companyAction: ', response)
            if(response.status === httpStatus.OK){
                return {
                    success: true,
                    message: response.data.message,
                    employerData: response.data.employerData
                }
            }
        } catch (error: any) {
            console.error('An error occur in employerLogin action at companyAction: ', error)
            const {data} = error.response
            return rejectWithValue({message: data.message})
        }
    }

)