import ExpenseList from "@/components/ExpenseList"
import {useAuth} from "@/utils/AuthProvider.tsx";
import AnalyticsCard from "@/components/AnalyticsCard.tsx";
import AnalyticsCardSkeleton from "@/components/skeletons/AnalyticsCardSkeleton.tsx";
import BudgetToExpenseChart from "@/components/BudgetToExpenseChart.tsx";

const Dashboard = () => {
    const { user } = useAuth()
  return (
    <div className="p-5">
        <h1 className="text-xl lg:text-3xl text-white font-semibold">Welcome back, <span className="capitalize">{user?.username}</span></h1>
        <p className="text-purple mb-5">How was your day?</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <AnalyticsCardSkeleton />
            <AnalyticsCard />
            <AnalyticsCard />
            <AnalyticsCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-rows-2 max-lg:gap-x-0 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-5">
            <div className="col-span-1 row-span-1 md:col-span-2">
                <BudgetToExpenseChart />
            </div>
            <div className=" row-span-2 max-lg:col-span-2 w-full min-h-[300px] lg:h-full">
                <h3 className="font-semibold text-white text-2xl mb-5">Latest Budget</h3>
            </div>
            <ExpenseList />
        </div>
    </div>
  )
}

export default Dashboard