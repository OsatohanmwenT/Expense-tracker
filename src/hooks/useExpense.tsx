import {useQuery} from "@tanstack/react-query";
import Expense from "@/entities/Expense.ts";
import useAxiosInstance from "@/services/apiClient.ts";

const useExpense = () => {
    const axiosInstance = useAxiosInstance()

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/expenses");
            return response.data;
        } catch (error) {
            console.error("Error fetching expenses:", error);
            throw new Error("Failed to fetch expenses");
        }
    };

    return useQuery<Expense[]>({
        queryKey: ["expense"],
        queryFn: fetchData,
        staleTime: 5 * 60 * 1000,
        retry: false
    })
}

export default useExpense;