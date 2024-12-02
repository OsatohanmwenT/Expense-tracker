import ExpenseSection from "@/components/ExpenseSection.tsx";
import useExpense from "@/hooks/useExpense.ts";

const ExpensePage = () => {
    const { data, error, isLoading } = useExpense();

    return (
        <div className="p-5">
            <h1>Expenses Page</h1>
            <div></div>
            <ExpenseSection isLoading={isLoading} data={data} error={error} />
        </div>
    )
}

export default ExpensePage;