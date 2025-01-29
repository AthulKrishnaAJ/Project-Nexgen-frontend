import { createAsyncThunk } from "@reduxjs/toolkit";
import { EmailWithPasswordState } from "../../types/common/commonTypes";
import { axiosAdmin } from "../../utils/axiosUtil";
// import httpStatus from "../../utils/httpStatus";



export const adminLoginAction = createAsyncThunk('admin/login',
    async (adminData: EmailWithPasswordState, {rejectWithValue}) => {
        try {
            const response = await axiosAdmin.post('/login', adminData)
            console.log('Response in adminLoginAction after login: ', response)
            return {
                adminData: response.data.adminData,
                success: response.data.status,
                message: response.data.message
            }
        } catch (error: any) {
            console.error('Error in adminLoginAction after login: ', error)
            const {data} = error.response
            return rejectWithValue({message: data.message})
        }
    }
)