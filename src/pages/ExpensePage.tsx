import ExpenseSection from "@/components/ExpenseSection.tsx";
import useExpense from "@/hooks/useExpense.ts";

export const useLoader = () => {

}

const ExpensePage = () => {
    const { data, error } = useExpense();

    return (
        <div className="p-5">
            <h1>Expenses Page</h1>
            <ExpenseSection data={data} error={error} />
        </div>
    )
}

export default ExpensePage;