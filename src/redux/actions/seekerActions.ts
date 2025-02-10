import { createAsyncThunk } from "@reduxjs/toolkit";
import { EmailWithPasswordState } from "../../types/common/commonTypes";
import { axiosSeeker } from "../../utils/axiosUtil";
import httpStatus from "../../utils/httpStatus";



export const seekerLoginAction = createAsyncThunk('seeker/login',
    async ({email, password}:EmailWithPasswordState, {rejectWithValue}) => {
        try {
            const response = await axiosSeeker.post('/login', {email, password})
            console.log('Response after login at seekerAction: ', response)
            if(response.status === httpStatus.OK){
                return {
                    success: true,
                    message: response.data.message,
                    userData: response.data.user
                }
            }
        } catch (error: any) {
            console.error('Error in seekerLoginAction at seekerAction: ', error)
            const {data} = error.response
            return rejectWithValue({message: data.message})
        }
    }
)