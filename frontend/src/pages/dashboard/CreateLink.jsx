import { useState } from "react";
import { toast } from "react-toastify";

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

  const copyLink = () => {

      navigator.clipboard.writeText(link.short_url);

      toast.success("Copied!");

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

      toast.success("Link Created Successfully");

      setFormData({
        long_url: "",
        custom_alias: "",
      });

    } catch (error) {

      toast.error("Unable to create link");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-16">

      <Card className="w-full max-w-2xl p-8 shadow-xl rounded-2xl bg-white">

        <h2 className="text-3xl font-bold mb-2">
          Create New Link
        </h2>

        <p className="text-gray-500 mb-8">
          Enter a long URL and optionally choose your own custom alias.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <Input
            placeholder="https://example.com"
            name="long_url"
            value={formData.long_url}
            onChange={handleChange}
          />

          <Input
            placeholder="my-custom-link (optional)"
            name="custom_alias"
            value={formData.custom_alias}
            onChange={handleChange}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Generating..." : "Generate Short Link"}
          </Button>

        </form>

        {link && (
          <Card className="mt-8 p-6">

            <h3 className="text-xl font-semibold mb-4">
              Your Short Link
            </h3>

            <div className="flex gap-3">

              <input
                readOnly
                value={link.short_url}
                className="flex-1 border rounded-lg p-3"
              />

              <Button onClick={copyLink}>
                Copy
              </Button>

            </div>

            <img
              src={link.qr_code}
              alt="QR Code"
              className="w-56 mx-auto mt-6"
            />

            <button onClick={downloadQR} className="mt-4 w-full bg-blue ">

              Download QR

            </button>

          </Card>
        )}

      </Card>

    </div>

  );
}

export default CreateLink;