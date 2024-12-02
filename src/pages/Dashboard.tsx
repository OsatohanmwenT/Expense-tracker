import ExpenseSection from "@/components/ExpenseSection.tsx"
import {useAuth} from "@/context/AuthProvider.tsx";
import AnalyticsCard from "@/components/AnalyticsCard.tsx";
import AnalyticsBarChart from "@/components/Charts/AnalyticsBarChart.tsx";
import useExpense from "@/hooks/useExpense.ts";
import useAnalytics from "@/hooks/useAnalytics.ts";
import {BudgetSummary} from "@/entities/Analytics.ts";

const Dashboard = () => {
    const { user } = useAuth()
    const { data, error, isLoading } = useExpense(5);
    const { data: analytics } = useAnalytics<BudgetSummary>("summary")

  return (
    <div className="p-5">

        <h1 className="text-xl lg:text-3xl text-white font-semibold">Welcome back, <span className="capitalize">{user?.username}</span></h1>
        <p className="text-purple mb-5">How was your day?</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <AnalyticsCard name="Total Amount of Expenses" total={analytics?.total_expenses} />
            <AnalyticsCard name="Total Budget" total={analytics?.budget_limit} />
            <AnalyticsCard name="Number of budget" total={analytics?.expenses_by_category.length} />
            <AnalyticsCard name="Amount remaining" total={analytics?.budget_limit &&  (analytics?.budget_limit - analytics?.total_expenses) || 0} />
        </div>
        <div className="grid grid-cols-1 max-lg:gap-x-0 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-5">
            <div className="col-span-1 row-span-1 md:col-span-2">
                <AnalyticsBarChart />
            </div>
            <div className=" row-span-2 max-lg:col-span-2 w-full min-h-[300px] lg:h-full">
                <h3 className="font-semibold text-white text-2xl mb-5">Latest Budget</h3>
                <p className="text-center text-red-400 font-semibold text-3xl py-10">No Budgets Found</p>
            </div>
        </div>
        <ExpenseSection isLoading={isLoading} data={data} error={error} />
    </div>
  )
}

export default Dashboard