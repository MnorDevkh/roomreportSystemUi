import Api from "./Api"

const getAllShift = async()=>{
    return Api.get(`shift/all`);
}
 const ShiftService = {getAllShift};
 export default ShiftService