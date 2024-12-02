import AnalyticsBarChart from "@/components/Charts/AnalyticsBarChart.tsx";
import AnalyticsLineChart from "@/components/Charts/AnalyticsLineChart.tsx";
import useAnalytics from "@/hooks/useAnalytics.ts";
import {AnalyticsDaily, BudgetSummary} from "@/entities/Analytics.ts";
import Notification from "@/components/Notification.tsx";
import AnalyticsPieChart from "@/components/Charts/AnalyticsPieChart";

const AnalyticsPage = () => {
    const { data: daily, isLoading } = useAnalytics<AnalyticsDaily>("daily")
    const { data: analytics } = useAnalytics<BudgetSummary>("summary")
    if (daily  === undefined) {
        return null
    }
    
    return (
        <div className="p-5">
            <h1 className="font-bold text-3xl mb-5 text-white">Analytics</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="xl:col-span-2">
                    {isLoading ? (<p className="font-semibold text-3xl text-white text-center">Loading...</p>)
                        :
                        (daily.expenses.length > 0 &&
                            <AnalyticsLineChart chartData={daily.expenses} />
                        )
                    }
                </div>
                
                <AnalyticsBarChart  />
                <AnalyticsPieChart data={analytics?.expenses_by_category} />
            </div>
                <Notification />
        </div>
    )
}

export default AnalyticsPage;