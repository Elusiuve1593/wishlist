import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false as boolean
}

const slice = createSlice({
    name: "spinner",
    initialState,
    reducers: {
        setSpinner: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading
        }
    }
})

export const spinnerReducer = slice.reducer
export const {setSpinner} = slice.actions 
