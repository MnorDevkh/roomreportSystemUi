import axios from "axios";
const Api = axios.create({
    baseURL: "http://116.212.156.84/:8080/api/v1",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
})

export default Api;
