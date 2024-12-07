import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { format } from "date-fns"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {AnalyticsExpense} from "@/entities/Analytics.ts";

const chartConfig = {
    total: {
        label: "Total Expenses",
        color: "hsl(var(--chart-1))",
    }
} satisfies ChartConfig

interface Props {
    chartData: AnalyticsExpense[];
}

function AnalyticsLineChart({ chartData }: Props) {
    if (!chartData || chartData.length === 0) {
        return (
          <p className="text-center text-muted-foreground">
            No data available to display on graph.
          </p>
        );
      }
    return (
        <Card className="dark:dark">
            <CardHeader>
                <CardTitle>Daily Expenses</CardTitle>
                <CardDescription>{format(new Date(chartData[0].date), "MMMM yyyy")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ChartContainer className="h-[400px] w-full" config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 12,
                                right: 10,
                                left: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis
                                scale="log"
                                domain={['auto', 'auto']}
                                tickFormatter={(value) => `₦${value.toLocaleString()}`}
                            />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                textAnchor="end"
                                tickMargin={10}
                                tickFormatter={(value) => format(new Date(value), "MMM dd")}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey="total"
                                type="monotone"
                                stroke="var(--color-total)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-total)",
                                    r: 4,
                                }}
                                activeDot={{
                                    r: 6,
                                    stroke: "var(--background)",
                                    strokeWidth: 2,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col mt-2 items-start gap-2 text-sm">
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

export default AnalyticsLineChart;

