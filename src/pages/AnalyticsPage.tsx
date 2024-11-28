import AnalyticsBarChart from "@/components/Charts/AnalyticsBarChart.tsx";
import AnalyticsLineChart from "@/components/Charts/AnalyticsLineChart.tsx";
import useAnalytics from "@/hooks/useAnalytics.ts";
import {AnalyticsDaily} from "@/entities/Analytics.ts";
import Notification from "@/components/Notification.tsx";

const AnalyticsPage = () => {
    const { data: daily, isLoading } = useAnalytics<AnalyticsDaily>("daily")
    if (daily === undefined) {
        return
    }
    return (
        <div className="p-5">
            <h1 className="font-bold text-3xl mb-5 text-white">Analytics</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <AnalyticsBarChart  />
                {isLoading ? (<p className="font-semibold text-3xl text-white text-center">Loading...</p>)
                    :
                <AnalyticsLineChart chartData={daily.expenses} />
                }
                <AnalyticsBarChart />
                <AnalyticsBarChart />
                <Notification />
            </div>
        </div>
    )
}

export default AnalyticsPage;