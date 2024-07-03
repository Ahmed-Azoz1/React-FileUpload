import axios from "axios";

// axios
const BASE_URL ='http://localhost:1337/api'

const API_KEY = import.meta.env.VITE_API_KEY;

const AxiosInstance=axios.create({
    baseURL:BASE_URL,
    headers:{
        Authorization:`Bearer ${API_KEY}`
    }
})


export default AxiosInstance