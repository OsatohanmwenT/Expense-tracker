import {useQuery} from "@tanstack/react-query";
import Expense from "@/entities/Expense.ts";
import useAxiosInstance from "@/services/apiClient.ts";

const useExpense = (limit?: number) => {
    const axiosInstance = useAxiosInstance()
    const url = limit ? `/expenses/?limit=${limit}` : `/expenses`;
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(url);
            return response.data as Expense[];
        } catch (error: any) {
            const errorMessage: string =
                error.response?.data?.detail || "Failed to fetch expenses";
            throw new Error(errorMessage);
        }
    };

    return useQuery<Expense[]>({
        queryKey: ["expenses", limit],
        queryFn: fetchData,
        staleTime: 60 * 1000,
        retry: 1
    })
}

export default useExpense;