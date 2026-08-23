import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:3000/dataget",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        setDocuments(response.data);

      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    getDocuments();
  }, []);

  // DELETE DOCUMENT
const deleteDocument = async (id) => {
  try {
    const token = localStorage.getItem("token");

    console.log("Deleting ID:", id);

    const response = await axios.delete(
      `http://localhost:3000/documents/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    toast.success("Post Deleted sucessfully")

    setDocuments((prev) =>
      prev.filter((doc) => doc._id !== id)
    );

  } catch (error) {
    console.log("DELETE ERROR:", error.response?.data || error.message);
    toast.error("unable to delete ")
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <h1 className="text-3xl font-extrabold uppercase">
            Documents
          </h1>

          <Link to="/">
            <button className="bg-amber-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-amber-300 transition">
              HOME
            </button>
          </Link>

        </div>

        {/* Documents */}
        {documents.length === 0 ? (

          <div className="text-center mt-20">
            <p className="text-gray-400 text-lg">
              No documents found
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {documents.map((doc) => (

              <div
                key={doc._id}
                className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg hover:border-amber-400 hover:-translate-y-1 transition-all duration-300"
              >

                {/* Image */}
                {doc.image && (
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-52 object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-5">

                  <h2 className="text-xl font-bold text-amber-400 mb-3">
                    {doc.title}
                  </h2>

                  <p className="text-gray-300 text-sm leading-6 line-clamp-4">
                    {doc.content}
                  </p>

                  {/* Read More */}
                  <Link to={`/story/${doc._id}`}>
                    <button className="mt-5 w-full bg-amber-400 text-black py-2 rounded-lg font-semibold hover:bg-amber-300 transition">
                      Read More
                    </button>
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => deleteDocument(doc._id)}
                    className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-500 transition"
                  >
                    Delete
                  </button>

                </div>
              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default Documents;