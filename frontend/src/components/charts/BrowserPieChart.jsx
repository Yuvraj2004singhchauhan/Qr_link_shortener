import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

import { Globe } from "lucide-react";

import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

const COLORS = [
    "#8B5CF6", // Violet
    "#06B6D4", // Cyan
    "#3B82F6", // Blue
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
];

function BrowserPieChart({ browserStats = {} }) {

    const data = Object.entries(browserStats).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    if (data.length === 0) {
        return (
            <Card>
                <EmptyState
                    title="No Browser Data"
                    message="Browser statistics will appear once visitors start using your links."
                />
            </Card>
        );
    }

    return (

        <Card hover>

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

                <div className="p-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg">

                    <Globe size={20} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Browser Distribution

                    </h2>

                    <p className="text-sm text-slate-400">

                        Visitors grouped by browser

                    </p>

                </div>

            </div>

            {/* Chart */}

            <div className="h-[320px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="45%"
                            outerRadius={95}
                            innerRadius={55}
                            paddingAngle={4}
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            labelLine={false}
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={entry.name}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))}

                        </Pie>

                        <Tooltip
                            contentStyle={{
                                background: "#0f172a",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "14px",
                                color: "#fff",
                            }}
                        />

                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            wrapperStyle={{
                                color: "#CBD5E1",
                                paddingTop: "16px",
                                fontSize: "14px",
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

}

export default BrowserPieChart;