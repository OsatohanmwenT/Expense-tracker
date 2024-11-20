import {useAuth} from "@/utils/AuthProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import Expense from "@/entities/Expense.ts";

const useExpense = () => {
    const { user } = useAuth();

    const fetchData = async() => {
        if (!user) {
            throw new Error("User not found");
        }
        try{
            const res = await fetch("/http://127.0.0.1:8000/expenses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.access_token}`
                },
            })
            if (!res.ok) {
                throw new Error("Error fetching expense");
            }
            return res.json();
        }
        catch(err) {
            console.error(err);
            throw new Error("Error fetching expense");
        }
    }

    return useQuery<Expense[]>({
        queryKey: ["expense"],
        queryFn: () => fetchData(),
        staleTime: 5 * 60 * 1000,
        retry: false
    })
}

export default useExpense;