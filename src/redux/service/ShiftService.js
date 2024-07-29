import api2 from "./Api2";

const getCurrenShift = async (pageNumber = 1, pageSize = 10, sortBy = "id", ascending = false) => {
    return api2.get(`/shift/current-user`, {
        params: {
            pageNumber,
            pageSize,
            sortBy,
            ascending,
        },
    });
};

const getAllShift = async () => {
    return api2.get(`/shift/all`);
};

const getShiftByUser = async (userId) => {
    return api2.get(`/shift/byUser?userId=${userId}`);
};

const getShiftByid = async (id)=>{
    return api2.get(`/shift/getById?id=${id}`)
}

const addNewShift = async (values) => {
    const response = await api2.post(`/shift/add`, values);
    return response.data;
};

const deleteById = async (id) => {
    return await api2.delete(`/shift/deleteById`, {
        params: { id }
    });
};

const updateById = async (id, data) => {
    return await api2.put(`/shift/updateById`, data, {
        params: { id }
    });
};

const ShiftService = { getAllShift, getCurrenShift, addNewShift, deleteById, updateById, getShiftByid, getShiftByUser };
export default ShiftService;
