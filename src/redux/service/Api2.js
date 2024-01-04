import axios from "axios";

const api2 = axios.create({
    baseURL: "http://localhost:8081/api/v1",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true, // Add this line
});

api2.interceptors.request.use((s) => {
    const token = localStorage.getItem("token");
    s.headers.Authorization = "Bearer "+ token;
    return s;
});


export default api2;