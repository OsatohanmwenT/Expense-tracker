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
const chartData = [
    { budgetName: "January", totalAmount: 2300, totalSpent: 1450 },
    { budgetName: "February", totalAmount: 3005, totalSpent: 1050 },
    { budgetName: "March", totalAmount: 2397, totalSpent: 1200 },
    { budgetName: "April", totalAmount: 730, totalSpent: 590 },
    { budgetName: "May", totalAmount: 1009, totalSpent: 630 },
    { budgetName: "June", totalAmount: 2104, totalSpent: 140 },
    { budgetName: "April", totalAmount: 930, totalSpent: 390 },
    { budgetName: "April", totalAmount: 730, totalSpent: 490 },
    { budgetName: "April", totalAmount: 563, totalSpent: 190 },
    { budgetName: "April", totalAmount: 438, totalSpent: 290 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

function AnalyticsBarChart() {
    return (
        <Card className="dark">
            <CardHeader>
                <CardTitle>Activities</CardTitle>
                <CardDescription>Budget to Expense</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ChartContainer className="h-[380px] w-full" config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="budgetName"
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
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}

export default AnalyticsBarChart

