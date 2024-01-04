import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    shifts: [],
}
export const ShiftSlices = createSlice({
    name: "shift",
    initialState,
    reducers: {
        setShift: (state,action)=>{
            state.shifts = action.payload
        }
    }
})
export const {setShift} = ShiftSlices.actions;
export default ShiftSlices.reducer;