import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://computer-service-server.vercel.app",
});
export default function useAxiosPublic() {
    return axiosPublic;
}
