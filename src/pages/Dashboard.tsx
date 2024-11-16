import ExpenseList from "@/components/ExpenseList"
import {useAuth} from "@/utils/AuthProvider.tsx";
import AnalyticsCard from "@/components/AnalyticsCard.tsx";

const Dashboard = () => {
    const { user } = useAuth()
  return (
    <div className="p-5">
        <h1 className="text-xl lg:text-3xl font-semibold">Welcome back, <span className="capitalize">{user?.username}</span></h1>
        <p className="text-purple mb-5">How was your day?</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <AnalyticsCard />
            <AnalyticsCard />
            <AnalyticsCard />
            <AnalyticsCard />
        </div>
        <ExpenseList />
    </div>
  )
}

export default Dashboard