import {
    Copy,
    ExternalLink,
    Trophy,
    MousePointerClick,
} from "lucide-react";

import toast from "react-hot-toast";

import Card from "../ui/Card";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

function TopLinksTable({ links = [] }) {

    const copyLink = async (url) => {

        try {

            await navigator.clipboard.writeText(url);

            toast.success("Link copied successfully!");

        }

        catch {

            toast.error("Failed to copy link");

        }

    };

    if (links.length === 0) {

        return (

            <Card>

                <EmptyState
                    title="No Top Links"
                    message="Your most popular links will appear here after visitors start clicking them."
                />

            </Card>

        );

    }

    return (

        <Card hover>

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

                <div className="p-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg">

                    <Trophy size={20} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Top Performing Links

                    </h2>

                    <p className="text-sm text-slate-400">

                        Links receiving the highest number of clicks

                    </p>

                </div>

            </div>

            {/* Table */}

            <div className="overflow-x-auto rounded-2xl border border-white/10">

                <table className="min-w-[650px] w-full">

                    <thead className="bg-white/5 backdrop-blur-xl">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-300 font-semibold">

                                Short Code

                            </th>

                            <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-300 font-semibold">

                                Total Clicks

                            </th>

                            <th className="px-6 py-4 text-left text-sm uppercase tracking-wider text-slate-300 font-semibold">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {links.map((link) => (

                            <tr
                                key={link.short_code}
                                className="border-t border-white/10 hover:bg-white/5 transition-all duration-300"
                            >

                                {/* Short Code */}

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-3">

                                       

                                        <span className="font-semibold text-white whitespace-nowrap">

                                            {link.short_code}

                                        </span>

                                    </div>

                                </td>

                                {/* Clicks */}

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-2 text-slate-300">

                                        <MousePointerClick size={16} />

                                        <span className="font-medium">

                                            {link.clicks}

                                        </span>

                                    </div>

                                </td>

                                {/* Actions */}

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-3">

                                        <a
                                            href={link.short_url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >

                                            <Button variant="primary">

                                                <ExternalLink size={18} />

                                                <span className="hidden lg:inline">

                                                    Open

                                                </span>

                                            </Button>

                                        </a>

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

export default TopLinksTable;