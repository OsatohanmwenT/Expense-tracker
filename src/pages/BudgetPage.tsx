import { BudgetSummary } from "@/entities/Analytics";
import useAnalytics from "@/hooks/useAnalytics";

const BudgetPage = () => {
    const { data: analytics } = useAnalytics<BudgetSummary>("summary")

    return (
        <div className="p-5">
            <h1 className="font-semibold text-3xl text-neutral-300">Budget</h1>
            <p className="font-semibold text-white/60 text-xl">Total budget: ₦{analytics?.budget_limit.toLocaleString()}</p>
            
            <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4">
            </div>
        </div>
    )
}

export default BudgetPage;