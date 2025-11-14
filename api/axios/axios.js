import axios from "axios"

export const baseURL = `http://localhost:4000/`
export const AxiosInstance = axios.create({
    baseURL
})
export default AxiosInstance

