import useAxiosInstance from "@/services/apiClient.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import Category, {PostCategory} from "@/entities/Category.ts";

interface PostExpenseContext {
    previousCategory: Category[];
}

const usePostCategory = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();

    return useMutation<Category, Error, PostCategory, PostExpenseContext>({
        mutationFn: (category: PostCategory) =>
            axiosInstance.post<Category>("/categories", category).then((res) => res.data),
        onMutate: (newCategory: PostCategory) => {
            const previousCategory =
                queryClient.getQueryData<Category[]>(["categories"]) || [];

            const tempCategory: Category = {
                id: Math.random(),
                ...newCategory,
            };

            queryClient.setQueryData<Category[]>(["categories"], (category = []) => [
                tempCategory,
                ...category,
            ]);

            toast.info("Adding expense...");

            return { previousCategory };

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
            toast.success("Expense added successfully!");
        },
        onError: (_error, _newCategory, context) => {
            if (context?.previousCategory) {
                queryClient.setQueryData<Category[]>(["categories"], context.previousCategory);
            }
            toast.error("Failed to Add Expense");
        },
    });
}

export default usePostCategory;