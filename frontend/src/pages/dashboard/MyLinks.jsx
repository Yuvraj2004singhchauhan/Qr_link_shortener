import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Link2,
    Search,
    FolderOpen,
} from "lucide-react";

import { toast } from "react-hot-toast";

import {
    getMyLinks,
    deleteLink,
    updateLink,
} from "../../services/linkService";

import Input from "../../components/ui/Input";
import Spinner from "../../components/ui/Spinner";
import LinksTable from "../../components/links/LinksTable";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

function MyLinks() {

    const navigate = useNavigate();

    const [links, setLinks] = useState([]);

    const [loading, setLoading] = useState(false);

    const [initialLoading, setInitialLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);

    const [deleteModal, setDeleteModal] = useState(false);

    const [editModal, setEditModal] = useState(false);

    const [selectedLink, setSelectedLink] = useState(null);

    const [saving, setSaving] = useState(false);

    const [editForm, setEditForm] = useState({

        long_url: "",

        custom_alias: "",

    });

    useEffect(() => {

        const timer = setTimeout(() => {

            fetchLinks();

        }, 400);

        return () => clearTimeout(timer);

    }, [search, page]);

    const fetchLinks = async () => {

        try {

            setLoading(true);

            const data = await getMyLinks(search, page);

            setLinks(data.results);

            setCount(data.count);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

            setInitialLoading(false);

        }

    };

    const handleDelete = (id) => {

        setSelectedLink(id);

        setDeleteModal(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteLink(selectedLink);

            toast.success("Link deleted successfully");

            fetchLinks();

        }

        catch {

            toast.error("Unable to delete link");

        }

        finally {

            setDeleteModal(false);

            setSelectedLink(null);

        }

    };

    const handleEdit = (link) => {

        setSelectedLink(link);

        setEditForm({

            long_url: link.long_url,

            custom_alias: link.short_code,

        });

        setEditModal(true);

    };

    const handleEditChange = (e) => {

        setEditForm({

            ...editForm,

            [e.target.name]: e.target.value,

        });

    };

    const saveChanges = async () => {

        try {

            setSaving(true);

            await updateLink(

                selectedLink.id,

                editForm

            );

            toast.success("Link updated successfully");

            setEditModal(false);

            fetchLinks();

        }

        catch {

            toast.error("Unable to update link");

        }

        finally {

            setSaving(false);

        }

    };

    const handleAnalytics = (shortCode) => {

        navigate(`/analytics/${shortCode}`);

    };

    if (initialLoading) {

        return <Spinner />;

    }

    return (
              <div className="space-y-10">

            {/* Hero */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 mb-4">

                        <FolderOpen size={16} />

                        Link Management

                    </div>

                    <h1 className="text-4xl font-bold text-white">

                        My Links

                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-400">

                        Search, edit, delete and monitor all your shortened links from one place.

                    </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-5">

                    <p className="text-xs uppercase tracking-widest text-slate-400">

                        Total Links

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-cyan-400">

                        {count}

                    </h2>

                </div>

            </div>

            {/* Search */}

            <div className="relative max-w-xl">

                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10"
                />

                <Input
                    placeholder="Search by long URL..."
                    value={search}
                    onChange={(e) => {

                        setSearch(e.target.value);

                        setPage(1);

                    }}
                    className="pl-11"
                />

            </div>

            {/* Loading */}

            {loading && (

                <div className="flex justify-center py-8">

                    <Spinner />

                </div>

            )}

            {/* Links */}

            <LinksTable
                links={links}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAnalytics={handleAnalytics}
            />

            {/* Pagination */}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

                <Button
                    variant="secondary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >

                    Previous

                </Button>

                <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold">

                        {page}

                    </div>

                    <span className="text-slate-400">

                        Page {page}

                    </span>

                </div>

                <Button
                    variant="primary"
                    disabled={page * 5 >= count}
                    onClick={() => setPage(page + 1)}
                >

                    Next

                </Button>

            </div>
                        {/* Edit Modal */}

            <Modal
                isOpen={editModal}
                onClose={() => setEditModal(false)}
                title="Edit Link"
            >

                <div className="space-y-6">

                    <Input
                        label="Long URL"
                        name="long_url"
                        value={editForm.long_url}
                        onChange={handleEditChange}
                    />

                    <Input
                        label="Custom Alias"
                        name="custom_alias"
                        value={editForm.custom_alias}
                        onChange={handleEditChange}
                    />

                    <div className="flex justify-end gap-3 pt-2">

                        <Button
                            variant="secondary"
                            onClick={() => setEditModal(false)}
                        >

                            Cancel

                        </Button>

                        <Button
                            loading={saving}
                            onClick={saveChanges}
                        >

                            Save Changes

                        </Button>

                    </div>

                </div>

            </Modal>

            {/* Delete Modal */}

            <Modal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                title="Delete Link"
            >

                <div className="space-y-6">

                    <div className="flex items-center gap-4">

                        <div className="h-14 w-14 rounded-2xl bg-red-500/15 flex items-center justify-center">

                            <Link2
                                className="text-red-400"
                                size={24}
                            />

                        </div>

                        <div>

                            <h3 className="text-lg font-semibold text-white">

                                Delete this link?

                            </h3>

                            <p className="text-slate-400 mt-1">

                                This action cannot be undone. The shortened
                                link and its analytics will be permanently
                                removed.

                            </p>

                        </div>

                    </div>

                    <div className="flex justify-end gap-3">

                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModal(false)}
                        >

                            Cancel

                        </Button>

                        <Button
                            variant="danger"
                            onClick={confirmDelete}
                        >

                            Delete Link

                        </Button>

                    </div>

                </div>

            </Modal>

        </div>

    );

}

export default MyLinks;