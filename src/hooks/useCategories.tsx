import Category from "@/entities/Category";
import { useAuth } from "@/context/AuthProvider.tsx";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
    const { user } = useAuth()

    const fetchData = async() => {
        if (!user?.access_token) {
            throw new Error("Access token is missing");
        }
        try{
            const res = await fetch("http://127.0.0.1:8000/categories/",{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${user.access_token}`
                },
            })
            return res.json()
        }catch(err) {
            console.error(err)
        }
    }

    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => fetchData(),
        enabled: !!user?.access_token,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
    
}

export default useCategories
