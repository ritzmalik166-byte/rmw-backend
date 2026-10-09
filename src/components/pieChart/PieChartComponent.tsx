"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// ✅ Chart Configuration
const chartConfig: ChartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "hsl(212 95% 68%)" },
  safari: { label: "Safari", color: "hsl(216 92% 60%)" },
  firefox: { label: "Firefox", color: "hsl(221.2 83.2% 53.3%)" },
  edge: { label: "Edge", color: "hsl(210 98% 78%)" },
  other: { label: "Other", color: "hsl(212 97% 87%)" },
};

export function PieChartComponent() {
  const [chartData, setChartData] = React.useState<{ browser: string; visitors: number }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // ✅ Fetch visitor data from API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/get-visit-data");
        setChartData(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching visitor data:", err.message);
          setError("Failed to load visitor data: " + err.message);
        } else {
          console.error("Unexpected error:", err);
          setError("Failed to load visitor data");
        }
      } finally {
        setLoading(false);
      }
      
    };

    fetchData();
  }, []);

  // ✅ Calculate total visitors
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + (curr.visitors || 0), 0);
  }, [chartData]);

  return (
    <Card style={{ width: "100%", background: "#f3f4f6", height: "60vh" }}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Visitor Data</CardTitle>
        <CardDescription>Tracking visitor count per browser</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            Visitors
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total visitors per browser</div>
      </CardFooter>
    </Card>
  );
}
