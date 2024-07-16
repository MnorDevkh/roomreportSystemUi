import api2 from "./Api2";

const getAllUser = async()=>{
    return api2.get(`/user/all`);
}
const getUserById = async(id)=>{
    return api2.get(`/user/all?id=${id}`);
}
// const getUserById = async()=>{
//     return await api2.get(``)
// }
const addShifToUser= async(data)=>{
    const response = await api2.post(`/user-shift/add`, data)
    return response.data
}
const addSubjectToUser = async(data)=>{
    return await api2.post(`/user-subject/add`, data)
}
const deleteShiftFromUser = async(userId, shiftId) => {
    
    try {
        return await api2.delete(`/user-shift/deleteUserShift?userId=${userId}&shiftId=${shiftId}`);
    } catch (error) {
        console.error('Error deleting shift:', error);
        throw error; // Propagate the error to the calling code
    }
};
const deleteSubjectFromUser = async (userId,subjectId) => {
    try {
        const response = await api2.delete(`/user-subject/deleteByUserSubject?userId=${userId}&subjectId=${subjectId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting shift:', error);
        throw error; // Propagate the error to the calling code
    }
};
 const UserService = {getAllUser,addShifToUser,addSubjectToUser,deleteShiftFromUser,deleteSubjectFromUser,getUserById};
 export default UserService