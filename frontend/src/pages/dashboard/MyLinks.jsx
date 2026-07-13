import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyLinks, deleteLink, } from "../../services/linkService";

import Input from "../../components/ui/Input";
import Spinner from "../../components/ui/Spinner";
import LinksTable from "../../components/links/LinksTable";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { toast } from "react-hot-toast";

function MyLinks() {
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedLink, setSelectedLink] = useState(null);

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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const handleDelete = (id) => {

    setSelectedLink(id);

    setDeleteModal(true);

  };

  const handleEdit = (link) => {
    console.log(link);
  };

  const handleAnalytics = (shortCode) => {
    navigate(`/analytics/${shortCode}`);
  };

  if (initialLoading) {
    return <Spinner />;
  }
  //Handle delete
  const confirmDelete = async () => {

    try {

      await deleteLink(selectedLink);

      fetchLinks();

      toast.success("Link deleted successfully");

    }

    catch (error) {

      toast.error("Unable to delete link");

    }

    finally {

      setDeleteModal(false);

      setSelectedLink(null);

    }

  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          My Links
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all your shortened links.
        </p>
      </div>

      <Input
        placeholder="Search using long URL..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {loading && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}

      <LinksTable
        links={links}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAnalytics={handleAnalytics}
      />

      <div className="flex justify-between items-center">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        <p>
          Page {page}
        </p>

        <button
          disabled={page * 10 >= count}
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>

      </div>
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Link"
      >
        <p className="text-gray-600">
          Are you sure you want to permanently delete this link?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <Button onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>

          <Button
            onClick={confirmDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>

        </div>
      </Modal>

    </div>
  );
}

export default MyLinks;