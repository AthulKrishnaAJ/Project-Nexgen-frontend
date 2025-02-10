import { createSlice } from "@reduxjs/toolkit";
import { SeekerPrimaryState } from "../../types/seeker/seekerInterfaces";
import { seekerLoginAction } from "../actions/seekerActions";



const initialState: SeekerPrimaryState = {
    seekerInfo: null
}


const seekerSlice = createSlice({
    name: 'seeker',
    initialState,
    reducers: {
        clearSeekerState: (state) => {
            state.seekerInfo = null
        }
    },
    extraReducers: (builder) =>  {
        builder
            .addCase(seekerLoginAction.fulfilled, (state, action) => {
                state.seekerInfo = action.payload?.userData
                console.log('in seeker slice',state.seekerInfo)
            })
    }
})


export default seekerSlice.reducer