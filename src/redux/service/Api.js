import axios from "axios";
const Api = axios.create({
    baseURL: "http://localhost:8081/api/v1",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
})

export default Api;