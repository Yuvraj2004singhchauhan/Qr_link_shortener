import { useEffect, useState } from "react";

import {
    BarChart3,
    Link2,
    MousePointerClick,
    Users,
    Trophy,
} from "lucide-react";

import { getDashboardAnalytics } from "../../services/dashboardService";

import Spinner from "../../components/ui/Spinner";

import AnalyticsCard from "../../components/dashboard/AnalyticsCard";

import BrowserPieChart from "../../components/charts/BrowserPieChart";

import DeviceBarChart from "../../components/charts/DeviceBarChart";

import ClickTrendChart from "../../components/charts/ClickTrendChart";

import TopLinksTable from "../../components/dashboard/TopLinksTable";

import RecentClicksTable from "../../components/dashboard/RecentClicksTable";

function Analytics() {

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const fetchAnalytics = async () => {

        try {

            const data = await getDashboardAnalytics();

            setAnalytics(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <Spinner />;

    }

    return (

        <div className="space-y-10">

            {/* Hero */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-500/20 px-4 py-2 text-violet-300 text-sm mb-4">

                        <BarChart3 size={16} />

                        Analytics Dashboard

                    </div>

                    <h1 className="text-4xl font-bold text-white">

                        Overall Analytics

                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-400">

                        Get a complete overview of all your shortened links,
                        clicks, visitors, devices and browser statistics.

                    </p>

                </div>

            </div>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <AnalyticsCard
                    title="Total Links"
                    value={analytics.total_links}
                    icon={Link2}
                />

                <AnalyticsCard
                    title="Total Clicks"
                    value={analytics.total_clicks}
                    icon={MousePointerClick}
                    color="from-cyan-500 via-sky-500 to-indigo-600"
                />

                <AnalyticsCard
                    title="Visitors"
                    value={analytics.unique_visitors}
                    icon={Users}
                    color="from-emerald-500 via-green-500 to-teal-500"
                />

                <AnalyticsCard
                    title="Top Link"
                    value={analytics.top_links?.[0]?.short_code || "-"}
                    icon={Trophy}
                    color="from-pink-500 via-rose-500 to-red-500"
                />

            </div>

            {/* Trend Chart */}

            <ClickTrendChart
                data={analytics.click_trend}
            />

            {/* Browser & Device */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <BrowserPieChart
                    browserStats={analytics.browser_stats}
                />

                <DeviceBarChart
                    deviceStats={analytics.device_stats}
                />

            </div>

            {/* Top Links */}

            <TopLinksTable
                links={analytics.top_links}
            />

            {/* Recent Activity */}

            <RecentClicksTable
                clicks={analytics.recent_activity}
            />

        </div>

    );

}

export default Analytics;