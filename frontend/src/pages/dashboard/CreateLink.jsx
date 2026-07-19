import { useState } from "react";
import { toast } from "react-toastify";
import {
    Link2,
    Wand2,
    Copy,
    Download,
    QrCode,
    CheckCircle2,
} from "lucide-react";

import { createLink } from "../../services/linkService";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function CreateLink() {

    const [formData, setFormData] = useState({
        long_url: "",
        custom_alias: "",
    });

    const [link, setLink] = useState(null);
    const [loading, setLoading] = useState(false);

    const copyLink = async () => {

        try {

            await navigator.clipboard.writeText(link.short_url);

            toast.success("Copied Successfully!");

        }

        catch {

            toast.error("Unable to copy link");

        }

    };

    const downloadQR = () => {

        window.open(link.qr_code);

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const data = await createLink(formData);

            setLink(data);

            toast.success("Short Link Created Successfully");

            setFormData({
                long_url: "",
                custom_alias: "",
            });

        }

        catch {

            toast.error("Unable to create link");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="space-y-8">

            {/* Hero */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-500/20 px-4 py-2 text-violet-300 text-sm mb-4">

                        <Link2 size={16} />

                        Link Generator

                    </div>

                    <h1 className="text-4xl font-bold text-white">

                        Create Short Link

                    </h1>

                    <p className="mt-3 text-slate-400 max-w-2xl">

                        Convert long URLs into beautiful, shareable links with
                        optional custom aliases and downloadable QR codes.

                    </p>

                </div>

            </div>

            {/* Form */}

            <Card hover className="max-w-3xl">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <Input
                        label="Long URL"
                        placeholder="https://example.com"
                        name="long_url"
                        value={formData.long_url}
                        onChange={handleChange}
                    />

                    <Input
                        label="Custom Alias (Optional)"
                        placeholder="my-custom-link"
                        name="custom_alias"
                        value={formData.custom_alias}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full"
                    >

                        <Wand2 size={18} />

                        Generate Short Link

                    </Button>

                </form>

            </Card>

            {/* Result */}

            {link && (

                <Card hover>

                    <div className="flex items-center gap-3 mb-6">

                        <div className="p-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white">

                            <CheckCircle2 size={22} />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-white">

                                Link Created Successfully

                            </h2>

                            <p className="text-slate-400">

                                Your shortened link is ready to use.

                            </p>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">

                        {/* Left */}

                        <div className="space-y-6">

                            <Input
                                label="Short URL"
                                readOnly
                                value={link.short_url}
                            />

                            <div className="grid grid-cols-2 gap-4">

                                <Button
                                    variant="secondary"
                                    onClick={copyLink}
                                >

                                    <Copy size={18} />

                                    Copy

                                </Button>

                                <Button
                                    onClick={downloadQR}
                                >

                                    <Download size={18} />

                                    Download QR

                                </Button>

                            </div>

                        </div>

                        {/* Right */}

                        <div className="flex flex-col items-center justify-center">

                            <div className="p-5 rounded-3xl bg-white">

                                <img
                                    src={link.qr_code}
                                    alt="QR Code"
                                    className="w-56 h-56 object-contain"
                                />

                            </div>

                            <div className="flex items-center gap-2 mt-5 text-slate-400">

                                <QrCode size={18} />

                                Scan to open the link

                            </div>

                        </div>

                    </div>

                </Card>

            )}

        </div>

    );

}

export default CreateLink;