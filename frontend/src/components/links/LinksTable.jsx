import {
    Copy,
    Pencil,
    Trash2,
    BarChart3,
    Download,
    ExternalLink,
} from "lucide-react";

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
                message="No Links Found"
            />
        );
    }

    const copyLink = (url) => {
        navigator.clipboard.writeText(url);
        alert("Short link copied!");
    };

    return (
        <div className="space-y-6">

            {links.map((link) => (

                <Card
                    key={link.id}
                    className="p-6 rounded-2xl shadow-lg"
                >

                    <div className="flex justify-between items-start">

                        <div>

                            <h2 className="font-bold text-xl flex items-center gap-2">
                                <ExternalLink size={20} />
                                {link.short_code}
                            </h2>

                            <p className="text-sm text-gray-500 mt-2">
                                Created on{" "}
                                {new Date(link.created_at).toLocaleDateString()}
                            </p>

                        </div>

                        <img
                            src={link.qr_code}
                            alt="QR Code"
                            className="w-28 h-28 rounded-lg border"
                        />

                    </div>

                    <div className="mt-6 space-y-4">

                        <div>
                            <p className="font-semibold mb-1">
                                Original URL
                            </p>

                            <a
                                href={link.long_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 break-all hover:underline"
                            >
                                {link.long_url}
                            </a>
                        </div>

                        <div>
                            <p className="font-semibold mb-1">
                                Short URL
                            </p>

                            <a
                                href={link.short_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-green-600 break-all hover:underline"
                            >
                                {link.short_url}
                            </a>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">

                        <Button onClick={() => copyLink(link.short_url)}>
                            <Copy size={18} />
                        </Button>

                        <Button onClick={() => onAnalytics(link.short_code)}>
                            <BarChart3 size={18} />
                        </Button>

                        <Button onClick={() => onEdit(link)}>
                            <Pencil size={18} />
                        </Button>

                        <Button
                            onClick={() => onDelete(link.id)}
                        >
                            <Trash2 size={18} />
                        </Button>

                        <a
                            href={link.qr_code}
                            download
                        >
                            <Button>
                                <Download size={18} />
                            </Button>
                        </a>

                    </div>

                </Card>

            ))}

        </div>
    );
}

export default LinksTable;