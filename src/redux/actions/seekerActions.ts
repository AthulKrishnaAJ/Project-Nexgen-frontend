import { createAsyncThunk } from "@reduxjs/toolkit";
import { EmailWithPasswordState } from "../../types/common/commonTypes";
import { SeekerEditProfilePayload } from "@/types/seeker/seekerInterfaces";
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
            const {data} = error?.response
            return rejectWithValue({message: data.message})
        }
    }
)


export const seekerEditProfileAction = createAsyncThunk('seeker/editProfile',
    async ({seekerId, seekerData}:SeekerEditProfilePayload, {rejectWithValue}) => {
        try {
            const response = await axiosSeeker.post('/editProfile', {seekerId, seekerData})
            console.log("Success response in seekerEditProfileAction: ", response)
            if(response.status === httpStatus.OK){
                return {
                    success: true,
                    message: response.data.message,
                    seekerData: response.data.seeker
                }
            }
        } catch (error: any) {
            console.error('Error in seekerLoginAction at seekerAction: ', error)
            const {data} = error?.response
            return rejectWithValue({message: data.message})
        }
    }
)