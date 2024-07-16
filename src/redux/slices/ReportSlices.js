import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reports: [],
    reportCurrenUser: [],
    reportById: {}
}

export const ReportSlices = createSlice({
    name: "Report",
    initialState,
    reducers: {
        setReport: (state, action) => {
            state.reports = action.payload
        },
        setReportCurrenUser: (state, action) => {
            state.reportCurrenUser = action.payload
        },
        setReportById: (state, action) => {
            state.reportById = action.payload
        }, 
        addReport(state, action) {
            state.reportCurrenUser.push(action.payload);
        },
        updateReport(state, action) {
            const index = state.reportCurrenUser.findIndex(report => report.id === action.payload.id);
            if (index !== -1) {
                state.reportCurrenUser[index] = action.payload;
            }
        },
        deleteReport(state, action) {
            state.reportCurrenUser = state.reportCurrenUser.filter(report => report.id !== action.payload);
        }

    },
});
export const { setReport, setReportCurrenUser, setReportById, addReport, updateReport, deleteReport } = ReportSlices.actions;
export default ReportSlices.reducer;
