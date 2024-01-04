import Api from "./Api"

const getAllTeachers = async () => {
    return Api.get(`/teachers/all`);
}
const TeacherServices = {getAllTeachers}
export default TeacherServices