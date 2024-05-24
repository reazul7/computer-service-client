import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "http://localhost:5080",
});
export default function useAxiosPublic() {
    return axiosPublic;
}
