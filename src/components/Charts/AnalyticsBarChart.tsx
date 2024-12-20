"use client"

import { TrendingUp } from "lucide-react"
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart.tsx"
import fillData, { FillDataType } from "@/utils/FillData.ts";



let chartData: FillDataType[] = []

if (chartData.length < 12) {
    chartData = fillData(chartData, 12);
}

const chartConfig = {
    desktop: {
        label: "remaining amount",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "expense",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

function AnalyticsBarChart() {
    return (
        <Card className="dark:dark dark:border-zinc-800">
            <CardHeader>
                <CardTitle>Activities</CardTitle>
                <CardDescription>Budget to Expense</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ChartContainer className="h-[400px] w-full" config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={true}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="totalSpent"
                            stackId="a"
                            fill="var(--color-desktop)"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="totalAmount"
                            stackId="a"
                            fill="var(--color-mobile)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total daily expenses for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}

export default AnalyticsBarChart


// function AnalyticsBarChart() {
//     const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly'>('monthly'); // State to toggle between weekly and monthly

//     // Function to modify data based on the selected time period
//     const getFormattedData = () => {
//         if (timePeriod === 'weekly') {
//             // Modify chartData for weekly representation, e.g., aggregate data by week
//             return fillData(chartData, 4); // Example of 4 weeks of data
//         }
//         return chartData; // Default is monthly data
//     };

//     const formattedData = getFormattedData();

//     return (
//         <Card className="dark">
//             <CardHeader>
//                 <CardTitle>Activities</CardTitle>
//                 <CardDescription>Budget to Expense</CardDescription>
//             </CardHeader>
//             <CardContent className="h-[400px]">
//                 <ChartContainer className="h-[400px] w-full" config={chartConfig}>
//                     <BarChart accessibilityLayer data={formattedData}>
//                         <CartesianGrid vertical={false} />
//                         <XAxis
//                             dataKey={timePeriod === 'weekly' ? "week" : "month"} // Dynamically set the dataKey
//                             tickLine={false}
//                             tickMargin={10}
//                             axisLine={true}
//                             tickFormatter={(value) => value}
//                         />
//                         <ChartTooltip content={<ChartTooltipContent />} />
//                         <ChartLegend content={<ChartLegendContent />} />
//                         <Bar
//                             dataKey="totalSpent"
//                             stackId="a"
//                             fill="var(--color-desktop)"
//                             radius={[0, 0, 0, 0]}
//                         />
//                         <Bar
//                             dataKey="totalAmount"
//                             stackId="a"
//                             fill="var(--color-mobile)"
//                             radius={[4, 4, 0, 0]}
//                         />
//                     </BarChart>
//                 </ChartContainer>
//             </CardContent>
//             <CardFooter className="flex-col items-start gap-2 text-sm">
//                 <div className="flex gap-2 font-medium leading-none">
//                     Trending up by 5.2% this {timePeriod} <TrendingUp className="h-4 w-4" />
//                 </div>
//                 <div className="leading-none text-muted-foreground">
//                     Showing total {timePeriod} expenses for the last 6 months
//                 </div>
//                 <div className="flex gap-2">
//                     <button onClick={() => setTimePeriod('weekly')} className="text-sm">
//                         Weekly
//                     </button>
//                     <button onClick={() => setTimePeriod('monthly')} className="text-sm">
//                         Monthly
//                     </button>
//                 </div>
//             </CardFooter>
//         </Card>
//     );
// }

// export default AnalyticsBarChart;
