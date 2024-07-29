import api2 from "./Api2";

const getAllSubject = async () => {
    return api2.get(`/subject/all`);
};

const getById = async (id) => {
    return api2.get(`/subject/getById?id=${id}`);
};

const AddSubject = async (data) => {
    return await api2.post(`/subject/add`, data);
};

const getAllCurrentSubject = async () => {
    return api2.get(`/subject/current-user`);
};

const getSubjectByUser = async (id) => {
    return api2.get(`/subject/byUser?id=${id}`);
};

const deleteById = async (id) => {
    return await api2.delete(`/subject/deleteById?id=${id}`);
};

const updateById = async (id, data) => {
    return await api2.put(`/subject/updateById?id=${id}`, data);
};

const SubjectService = {
    getAllSubject,
    getAllCurrentSubject,
    getSubjectByUser,
    AddSubject, 
    deleteById,
    updateById,
    getById
};

export default SubjectService;
