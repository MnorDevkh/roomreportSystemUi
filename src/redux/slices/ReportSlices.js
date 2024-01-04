import { createSlice } from "@reduxjs/toolkit";

const initialState={
    reports: []
}

export const ReportSlices = createSlice({
name: "Report",
initialState,
reducers:{
    setReport: (state, action)=>{
        state.reports = action.payload
    }
},
});
export const {setReport} = ReportSlices.actions;
export default ReportSlices.reducer;
