import {
    Globe,
    Laptop,
    Smartphone,
    CalendarDays,
    MapPin,
} from "lucide-react";

import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

function RecentClicksTable({ clicks = [] }) {

    if (clicks.length === 0) {
        return (
            <Card>
                <EmptyState
                    title="No Recent Clicks"
                    message="Visitor activity will appear here once people start opening your shortened links."
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

                        Recent Clicks

                    </h2>

                    <p className="text-sm text-slate-400">

                        Latest visitor activity on your links

                    </p>

                </div>

            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10">

                <table className="min-w-[850px] w-full">

                    <thead className="bg-white/5 backdrop-blur-xl">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-300 font-semibold">

                                IP Address

                            </th>

                            <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-300 font-semibold">

                                Browser

                            </th>

                            <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-300 font-semibold">

                                Operating System

                            </th>

                            <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-300 font-semibold">

                                Device

                            </th>

                            <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-300 font-semibold">

                                Clicked At

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {clicks.map((click, index) => (

                            <tr
                                key={index}
                                className="border-t border-white/10 hover:bg-white/5 transition-all duration-300"
                            >

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white">

                                            <MapPin size={16} />

                                        </div>

                                        <span className="font-medium text-white whitespace-nowrap">

                                            {click.ip_address}

                                        </span>

                                    </div>

                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-2 text-slate-300">

                                        <Globe size={16} />

                                        <span className="whitespace-nowrap">

                                            {click.browser}

                                        </span>

                                    </div>

                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-2 text-slate-300">

                                        <Laptop size={16} />

                                        <span className="whitespace-nowrap">

                                            {click.operating_system}

                                        </span>

                                    </div>

                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-2 text-slate-300">

                                        <Smartphone size={16} />

                                        <span className="whitespace-nowrap">

                                            {click.device}

                                        </span>

                                    </div>

                                </td>

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-2 text-slate-300">

                                        <CalendarDays size={16} />

                                        <span className="whitespace-nowrap">

                                            {new Date(click.clicked_at).toLocaleString()}

                                        </span>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </Card>

    );

}

export default RecentClicksTable;