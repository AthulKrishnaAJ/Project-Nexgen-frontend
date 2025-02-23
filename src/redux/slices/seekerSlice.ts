import { createSlice } from "@reduxjs/toolkit";
import { SeekerPrimaryState } from "../../types/seeker/seekerInterfaces";
import { seekerLoginAction, seekerEditProfileAction } from "../actions/seekerActions";



const initialState: SeekerPrimaryState = {
    seekerInfo: null
}


const seekerSlice = createSlice({
    name: 'seeker',
    initialState,
    reducers: {
        clearSeekerState: (state) => {
            state.seekerInfo = null
        },
        updateSeekerToken: (state, action) => {
            if(state.seekerInfo){
                state.seekerInfo.accessToken = action.payload
            }
        }
    },
    extraReducers: (builder) =>  {
        builder
            .addCase(seekerLoginAction.fulfilled, (state, action) => {
                state.seekerInfo = action.payload?.userData
            }).addCase(seekerEditProfileAction.fulfilled, (state, action) => {
                const updatedSeekerData = action.payload?.seekerData
                state.seekerInfo = {...state.seekerInfo, ...updatedSeekerData}
                console.log('Updated data: ', state.seekerInfo)
            })
    }
})

export const {clearSeekerState, updateSeekerToken} = seekerSlice.actions
export default seekerSlice.reducer