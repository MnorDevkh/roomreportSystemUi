import { configureStore } from "@reduxjs/toolkit";
import ReportSlices from "./slices/ReportSlices";
import RoomSlices from "./slices/RoomSlices";
import  TeacherSlices from "./slices/TeacherSlices";
import ShiftSlices from "./slices/ShiftSlices";


const store= configureStore({
    reducer: {
      report: ReportSlices,
      room: RoomSlices,
      lecturer: TeacherSlices,
      shift: ShiftSlices
    }
 })
 export default store;