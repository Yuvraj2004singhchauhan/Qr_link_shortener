import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { MonitorSmartphone } from "lucide-react";

import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

function DeviceBarChart({ deviceStats = {} }) {

    const data = Object.entries(deviceStats).map(
        ([device, clicks]) => ({
            device,
            clicks,
        })
    );

    if (data.length === 0) {

        return (

            <Card>

                <EmptyState
                    title="No Device Data"
                    message="Device statistics will appear once visitors start opening your links."
                />

            </Card>

        );

    }

    return (

        <Card hover>

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

                <div className="p-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg">

                    <MonitorSmartphone size={20} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Device Distribution

                    </h2>

                    <p className="text-sm text-slate-400">

                        Clicks grouped by device type

                    </p>

                </div>

            </div>

            {/* Chart */}

            <div className="h-[340px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={data}
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
                            dataKey="device"
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
                            cursor={{
                                fill: "rgba(255,255,255,0.05)",
                            }}
                        />

                        <Bar
                            dataKey="clicks"
                            fill="#8B5CF6"
                            radius={[10, 10, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );

}

export default DeviceBarChart;