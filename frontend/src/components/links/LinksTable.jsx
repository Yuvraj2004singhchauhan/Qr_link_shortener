import {
    Copy,
    Pencil,
    Trash2,
    BarChart3,
    Download,
    ExternalLink,
    CalendarDays,
} from "lucide-react";

import { toast } from "react-hot-toast";

import Card from "../ui/Card";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

function LinksTable({
    links,
    onDelete,
    onEdit,
    onAnalytics,
}) {

    if (!links || links.length === 0) {
        return (
            <EmptyState
                title="No Links Yet"
                message="Create your first shortened link to start tracking clicks and analytics."
            />
        );
    }

    const copyLink = async (url) => {

        try {

            await navigator.clipboard.writeText(url);

            toast.success("Short link copied!");

        }

        catch {

            toast.error("Unable to copy link");

        }

    };

    return (

        <div className="space-y-8">

            {links.map((link) => (

                <Card
                    key={link.id}
                    hover
                    className="overflow-hidden"
                >

                    {/* Header */}

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                        <div className="flex-1">

                            <div className="flex items-center gap-3">

                                <div className="p-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg">

                                    <ExternalLink size={18} />

                                </div>

                                <div>

                                    <h2 className="text-xl font-bold text-white break-all">

                                        {link.short_code}

                                    </h2>

                                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">

                                        <CalendarDays size={15} />

                                        Created on{" "}

                                        {new Date(link.created_at).toLocaleDateString()}

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* QR */}

                        <div className="flex justify-center">

                            <div className="bg-white rounded-2xl p-3 shadow-xl">

                                <img
                                    src={link.qr_code}
                                    alt="QR Code"
                                    className="w-28 h-28 rounded-xl"
                                />

                            </div>

                        </div>

                    </div>

                    {/* URLs */}

                    <div className="mt-8 space-y-6">

                        <div>

                            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">

                                Original URL

                            </p>

                            <a
                                href={link.long_url}
                                target="_blank"
                                rel="noreferrer"
                                className="break-all text-cyan-300 hover:text-cyan-200 transition"
                            >

                                {link.long_url}

                            </a>

                        </div>

                        <div>

                            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">

                                Short URL

                            </p>

                            <a
                                href={link.short_url}
                                target="_blank"
                                rel="noreferrer"
                                className="break-all text-violet-300 hover:text-violet-200 transition font-medium"
                            >

                                {link.short_url}

                            </a>

                        </div>

                    </div>

                    <hr className="my-8 border-white/10" />

                    {/* Buttons */}

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">

                        <Button
                            variant="secondary"
                            onClick={() => copyLink(link.short_url)}
                            className="w-full"
                        >

                            <Copy size={18} />

                            <span className="hidden lg:inline">

                                Copy

                            </span>

                        </Button>

                        <Button
                            variant="primary"
                            onClick={() => onAnalytics(link.short_code)}
                            className="w-full"
                        >

                            <BarChart3 size={18} />

                            <span className="hidden lg:inline">

                                Analytics

                            </span>

                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => onEdit(link)}
                            className="w-full"
                        >

                            <Pencil size={18} />

                            <span className="hidden lg:inline">

                                Edit

                            </span>

                        </Button>

                        <Button
                            variant="danger"
                            onClick={() => onDelete(link.id)}
                            className="w-full"
                        >

                            <Trash2 size={18} />

                            <span className="hidden lg:inline">

                                Delete

                            </span>

                        </Button>

                        <a
                            href={link.qr_code}
                            download
                            className="w-full"
                        >

                            <Button
                                variant="success"
                                className="w-full"
                            >

                                <Download size={18} />

                                <span className="hidden lg:inline">

                                    QR Code

                                </span>

                            </Button>

                        </a>

                    </div>

                </Card>

            ))}

        </div>

    );

}

export default LinksTable;