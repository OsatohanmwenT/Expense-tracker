import axios from 'axios';
import {useAuth} from "@/utils/AuthProvider.tsx";

const useAxiosInstance = () => {
    const { user } = useAuth();

    const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:8000"
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            if (user && user.access_token) {
                config.headers.Authorization = `Bearer ${user.access_token}`;
            }
            return config;
        },
        (error) => {
            // Handle the error
            return Promise.reject(error);
        }
    );
    return axiosInstance;
}

export default useAxiosInstance;


// import axios from "axios";
// import { useAuth } from "@/utils/AuthProvider.tsx";
//
// const useAxiosInstance = () => {
//     const { user } = useAuth();
//
//     const axiosInstance = axios.create({
//         baseURL: "http://127.0.0.1:8000",
//     });
//
//     // Add a request interceptor
//     axiosInstance.interceptors.request.use(
//         (config) => {
//             if (user && user.access_token) {
//                 config.headers.Authorization = `Bearer ${user.access_token}`;
//             }
//             return config;
//         },
//         (error) => {
//             // Handle the error
//             return Promise.reject(error);
//         }
//     );
//
//     return axiosInstance;
// };
//
// export default useAxiosInstance;
