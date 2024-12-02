import { TrendingUp } from "lucide-react";
import { Cell, LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { generateColor } from "@/utils/generateColor";

interface ChartDataType {
  category_name: string;
  total: number;
}

function AnalyticsPieChart({ data }: { data: ChartDataType[] }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No data available to display on pie chart.
      </p>
    );
  }
  
  const chartConfig = data.reduce((config, item, index) => {
    config[item.category_name] = {
      label: item.category_name,
      color: generateColor(index),
    }
    return config
  }, {} as Record<string, { label: string; color: string }>)

  const totalValue = data.reduce((sum, entry) => sum + entry.total, 0);

  return (
    <Card className="flex dark flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label List</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[400px] [&_.recharts-text]:fill-white"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category_name" />}
            />
            <Pie
              data={data}
              dataKey="total"
              nameKey="category_name"
              label={({ total }) => {
                const percentage = ((total / totalValue) * 100).toFixed(1);
                return `${percentage}%`;
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartConfig[entry.category_name].color} />
              ))}
              <LabelList
                dataKey="category_name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing relationship different categories
        </div>
      </CardFooter>
    </Card>
  );
}

export default AnalyticsPieChart;
