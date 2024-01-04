import { createSlice } from "@reduxjs/toolkit";
const initialState={
    lecturers: [],
}
export const TeacherSlices = createSlice({
    name: "lecturer",
    initialState,
    reducers:{
        setLecturer: (state,action) => {
            state.lecturers = action.payload;
        }
    },
});
export const {setLecturer} = TeacherSlices.actions;
export default TeacherSlices.reducer;