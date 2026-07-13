import Card from "../ui/Card";

function DashboardCard({
    title,
    value,
}) {
    return (

        <Card>

            <p className="text-slate-500 text-sm">

                {title}

            </p>

            <h2 className="text-4xl font-bold mt-3">

                {value}

            </h2>

        </Card>

    );
}

export default DashboardCard;