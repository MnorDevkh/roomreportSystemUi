import Api from "./Api"
import api2 from "./Api2"

const getAllReport = async()=>{
    return await api2.get(`/report/all`)
}
const postReport = async(formData)=>{
    return await Api.post(`/report/add`,formData)
}
const ReportServices = {getAllReport,postReport}
export default ReportServices;