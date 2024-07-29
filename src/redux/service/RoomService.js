import api2 from "./Api2";

const getAllRoom = async () => {
    return api2.get(`/room/all`)
}
const getRoomById = async (id) => {
    return api2.get(`/room/getById?id=${id}`)
}
const addRoom = async (values) => {
    const response = await api2.post("/room/add", values)
    return response.data
}
const editRoom = async (id,values) => {
    const response = await api2.put(`/room/updetById?id=${id}`, values)
    return response.data
}
const deleteById = async (id) => {
    return await api2.delete(`/room/deleteById?id=${id}`);
}
const RoomService = { getAllRoom, addRoom, deleteById,editRoom,getRoomById }
export default RoomService;