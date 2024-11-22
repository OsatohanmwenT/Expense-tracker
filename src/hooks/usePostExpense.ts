import useAxiosInstance from "@/services/apiClient.ts";
import Expense from "@/entities/Expense.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

interface PostExpenseContext {
    previousExpenses: Expense[];
}

const usePostExpense = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();

    return useMutation<Expense, Error, Expense, PostExpenseContext>({
        mutationFn: (expense: Expense) =>
            axiosInstance.post<Expense>("/expenses", expense).then((res) => res.data),
        onMutate: (newExpense: Expense) => {
            const previousExpenses =
                queryClient.getQueryData<Expense[]>(["expenses"]) || [];

            queryClient.setQueryData<Expense[]>(["expenses"], (expenses = []) => [
                newExpense,
                ...expenses,
            ]);

            toast.info("Adding expense...");

            return { previousExpenses };

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["expenses"]
            });
            toast.success("Expense added successfully!");
        },
        onError: (_error, _newExpense, context) => {
            if (context?.previousExpenses) {
                queryClient.setQueryData<Expense[]>(["expenses"], context.previousExpenses);
            }
            toast.error("Failed to Add Expense");
        },
    });
}

export default usePostExpense;