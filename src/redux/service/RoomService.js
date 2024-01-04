
import Api from "./Api";

const getAllRoom = async()=>{
    return Api.get(`/room/all`)
}
const RoomService ={getAllRoom}
export default RoomService;