import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
    baseURL: "http://localhost:5080",
});
export default function useAxiosSecure() {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    // request interceptor to add authorization header for every secure request to the api
    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem("access-token");
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        },
    );

    // intercepts 401 and 403 methods
    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        async error => {
            const status = error.response.status;
            // for 401 and 403 logout the user and move the user to the login page
            if (status === 401 || status === 403) {
                await logOut();
                navigate("/login");
            }
            return Promise.reject(error);
        },
    );
    return axiosSecure;
}
