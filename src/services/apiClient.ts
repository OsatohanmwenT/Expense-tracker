import axios from 'axios';
import {useAuth} from "@/context/AuthProvider.tsx";

const useAxiosInstance = () => {
    const { user } = useAuth();

    return axios.create({
        baseURL: "http://127.0.0.1:8000",
        headers: {
            Authorization: `bearer ${user?.access_token || ""}`
        }
    });
}

export default useAxiosInstance;