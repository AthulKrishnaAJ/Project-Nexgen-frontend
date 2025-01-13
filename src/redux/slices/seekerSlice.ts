import { createSlice } from "@reduxjs/toolkit";
import { SeekerPrimaryState } from "../../types/seeker/seekerInterfaces";
import { seekerLoginAction } from "../actions/seekerActions";



const initialState: SeekerPrimaryState = {
    seekerInfo: null
}


const seekerSlice = createSlice({
    name: 'seeker',
    initialState,
    reducers: {},
    extraReducers: (builder) =>  {
        builder
            .addCase(seekerLoginAction.fulfilled, (state, action) => {
                state.seekerInfo = action.payload?.userData
            })
    }
})


export default seekerSlice.reducer