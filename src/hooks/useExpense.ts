import {useQuery} from "@tanstack/react-query";
import Expense from "@/entities/Expense.ts";
import useAxiosInstance from "@/services/apiClient.ts";

const useExpense = () => {
    const axiosInstance = useAxiosInstance()

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/expenses/?offset=0");
            return response.data as Expense[];
        } catch (error: any) {
            const errorMessage: string =
                error.response?.data?.detail || "Failed to fetch expenses";
            throw new Error(errorMessage);
        }
    };

    return useQuery<Expense[]>({
        queryKey: ["expenses"],
        queryFn: fetchData,
        staleTime: 60 * 1000,
        retry: 1
    })
}

export default useExpense;