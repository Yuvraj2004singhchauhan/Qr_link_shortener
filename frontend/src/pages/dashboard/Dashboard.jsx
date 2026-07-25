import { useEffect, useState } from "react";

import {
    LayoutDashboard,
    Link2,
    MousePointerClick,
    Users,
    Trophy,
} from "lucide-react";

import Spinner from "../../components/ui/Spinner";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RecentLinksTable from "../../components/links/RecentLinksTable";

import { getDashboardData } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getDashboardData();

                setDashboard(data);

            }

            catch (err) {

                console.error(err);

            }

            finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading) {

        return <Spinner />;

    }

    return (

        <div className="space-y-10">

            {/* Hero */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 mb-4">

                        <LayoutDashboard size={16} />

                        Dashboard

                    </div>

                    <h1 className="text-4xl font-bold text-white">

                        Welcome Back

                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-400">

                        Here's an overview of your URL shortener. Track links,
                        monitor clicks, and analyze visitor activity from one place.

                    </p>

                </div>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <DashboardCard
                    title="Total Links"
                    value={dashboard.total_links}
                    icon={Link2}
                />

                <DashboardCard
                    title="Total Clicks"
                    value={dashboard.total_clicks}
                    icon={MousePointerClick}
                    color="from-cyan-500 via-sky-500 to-indigo-600"
                />

                <DashboardCard
                    title="Visitors"
                    value={dashboard.unique_visitors}
                    icon={Users}
                    color="from-emerald-500 via-green-500 to-teal-500"
                />

                <DashboardCard
                    title="Most Clicked"
                    value={dashboard.most_clicked_link?.clicks ?? 0}
                    icon={Trophy}
                    color="from-pink-500 via-rose-500 to-red-500"
                />

            </div>

            {/* Recent Links */}

            <RecentLinksTable
                links={dashboard.recent_links}
            />

        </div>

    );

}

export default Dashboard;