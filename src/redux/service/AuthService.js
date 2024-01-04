import Api from "./Api";


const postLogin = async(formData)=>{
    return await Api.post(`/auth/signin`,formData)
}
const AuthServices = {postLogin}
export default AuthServices;