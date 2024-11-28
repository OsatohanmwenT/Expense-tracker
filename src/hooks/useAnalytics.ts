import useAxiosInstance from "@/services/apiClient.ts";
import {useQuery} from "@tanstack/react-query";

const useAnalytics = <T>(type: string) => {
    const axiosInstance = useAxiosInstance();

    return useQuery<T>({
        queryKey: ["analytics", type],
        queryFn: () => axiosInstance.get<T>(`/analytics/${type}`).then(res => res.data),
    })
}

export default useAnalytics;