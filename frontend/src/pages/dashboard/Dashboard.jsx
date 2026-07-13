import { useEffect, useState } from "react";

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

                console.log(err);

            }

            finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading)
        return <Spinner />;

    return (

        <div className="space-y-8">

            <div className="grid lg:grid-cols-4 gap-6">

                <DashboardCard
                    title="Total Links"
                    value={dashboard.total_links}
                />

                <DashboardCard
                    title="Total Clicks"
                    value={dashboard.total_clicks}
                />

                <DashboardCard
                    title="Visitors"
                    value={dashboard.unique_visitors}
                />

                <DashboardCard
                    title="Most Clicked"
                    value={dashboard.most_clicked_link.clicks}
                />

            </div>

            <RecentLinksTable
                links={dashboard.recent_links}
            />

        </div>

    );

}

export default Dashboard;