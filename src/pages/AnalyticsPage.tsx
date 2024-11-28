import AnalyticsBarChart from "@/components/AnalyticsBarChart.tsx";

const AnalyticsPage = () => {
    return (
        <div className="p-5">
            <h1 className="font-bold text-3xl mb-5 text-white">Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsBarChart />
                <AnalyticsBarChart />
                <AnalyticsBarChart />
                <AnalyticsBarChart />
            </div>
        </div>
    )
}

export default AnalyticsPage;