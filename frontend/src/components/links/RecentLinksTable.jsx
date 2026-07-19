import { ExternalLink, Link2 } from "lucide-react";

import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

function RecentLinksTable({ links = [] }) {

    if (links.length === 0) {
        return (
            <Card>
                <EmptyState
                    title="No Recent Links"
                    message="Your recently created links will appear here."
                />
            </Card>
        );
    }

    return (

        <Card hover>

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

                <div className="p-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg">

                    <Link2 size={20} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Recent Links

                    </h2>

                    <p className="text-sm text-slate-400">

                        Your latest shortened URLs

                    </p>

                </div>

            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10">

                <table className="min-w-[700px] w-full">

                    <thead className="bg-white/5 backdrop-blur-xl">

                        <tr>

                            <th className="text-left px-6 py-4 text-sm font-semibold uppercase tracking-wider text-slate-300">

                                Short URL

                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold uppercase tracking-wider text-slate-300">

                                Original URL

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {links.map((link) => (

                            <tr
                                key={link.id}
                                className="border-t border-white/10 hover:bg-white/5 transition-all duration-300"
                            >

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-3">

                                        <span className="font-semibold text-white">

                                            {link.short_code}

                                        </span>

                                    </div>

                                </td>

                                <td className="px-6 py-5">

                                    <a
                                        href={link.long_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="break-all text-cyan-300 hover:text-cyan-200 hover:underline transition"
                                    >

                                        {link.long_url}

                                    </a>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </Card>

    );

}

export default RecentLinksTable;