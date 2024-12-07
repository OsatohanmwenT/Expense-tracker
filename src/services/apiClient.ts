import axios from 'axios';
import {useAuth} from "@/context/AuthProvider.tsx";

const useAxiosInstance = () => {
    const { user } = useAuth();

    return axios.create({
        baseURL: import.meta.env.VITE_URL,
        headers: {
            Authorization: `bearer ${user?.access_token || ""}`
        }
    });
}

export default useAxiosInstance;