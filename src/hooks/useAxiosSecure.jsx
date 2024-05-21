import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: "http://localhost:5080",
});
export default function useAxiosSecure() {
    return axiosSecure;
}
