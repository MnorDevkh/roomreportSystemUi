import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allUser: [],
    userById:[],
}
export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAllUser: (state,action)=>{
            state.allUser = action.payload          
        },
        setUserById: (state,action)=>{
            state.userById = action.payload          
        },
    }
   
})
export const {setAllUser,setUserById} = UserSlice.actions;
export default UserSlice.reducer;