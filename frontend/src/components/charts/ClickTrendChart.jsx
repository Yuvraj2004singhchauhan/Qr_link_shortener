import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { TrendingUp } from "lucide-react";

import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

function ClickTrendChart({ data = [] }) {

    const chartData = data.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
        }),
        clicks: item.clicks,
    }));

    if (chartData.length === 0) {
        return (
            <Card>
                <EmptyState
                    title="No Click Trend"
                    message="Click trends will appear once your links start receiving traffic."
                />
            </Card>
        );
    }

    return (

        <Card hover>

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

                <div className="p-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg">

                    <TrendingUp size={20} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Click Trend

                    </h2>

                    <p className="text-sm text-slate-400">

                        Daily clicks on your shortened links

                    </p>

                </div>

            </div>

            {/* Chart */}

            <div className="h-[340px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 10,
                        }}
                    >

                        <CartesianGrid
                            stroke="rgba(255,255,255,0.08)"
                            strokeDasharray="4 4"
                        />

                        <XAxis
                            dataKey="date"
                            tick={{
                                fill: "#CBD5E1",
                                fontSize: 12,
                            }}
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            allowDecimals={false}
                            tick={{
                                fill: "#CBD5E1",
                                fontSize: 12,
                            }}
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#0F172A",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "14px",
                                color: "#fff",
                            }}
                            labelStyle={{
                                color: "#fff",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="clicks"
                            stroke="#8B5CF6"
                            strokeWidth={4}
                            dot={{
                                fill: "#06B6D4",
                                stroke: "#fff",
                                strokeWidth: 2,
                                r: 5,
                            }}
                            activeDot={{
                                r: 7,
                                fill: "#06B6D4",
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

}

export default ClickTrendChart;