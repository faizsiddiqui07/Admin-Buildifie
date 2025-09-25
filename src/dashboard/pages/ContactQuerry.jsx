import React, { useEffect, useState } from "react";
import { base_url } from "../../config/config";
import axios from "axios";
import { FaTrash, FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

const ContactQuerry = () => {
  const [data, setData] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchContactQuery = async () => {
      try {
        const response = await axios.get(`${base_url}/api/contact-queries`);
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching query data:", error);
        toast.error("Failed to fetch query data");
      }
    };

    fetchContactQuery();
  }, []);

  const handleDeleteContactQuery = async (id) => {
    if (window.confirm("Are you sure you want to delete this Query?")) {
      try {
        await axios.delete(`${base_url}/api/contact-query/${id}`);
        toast.success("Query deleted successfully");
        setData(data.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting Query:", error);
        toast.error("Failed to delete Query");
      }
    }
  };

  const openModal = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuery(null);
  };

  return (
    <div className="relative w-full overflow-x-auto">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">Contact Queries</h1>
      <div className="border rounded-lg w-full overflow-x-auto">
        <table className="min-w-[600px] w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Full Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((item, index) => (
                <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.fullName}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2 truncate max-w-[200px]">{item.message}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openModal(item)}
                        className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
                        title="See Query"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleDeleteContactQuery(item._id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                        title="Delete Query"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-h-[90vh] overflow-y-auto rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={closeModal}
              aria-label="Close"
            >
              <IoMdClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Query Details</h2>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="block text-gray-600">Full Name:</strong>
                <p>{selectedQuery.fullName}</p>
              </div>
              <div>
                <strong className="block text-gray-600">Email:</strong>
                <p>{selectedQuery.email}</p>
              </div>
              <div>
                <strong className="block text-gray-600">Subject:</strong>
                <p>{selectedQuery.subject}</p>
              </div>
              <div>
                <strong className="block text-gray-600">Message:</strong>
                <p className="whitespace-pre-line">{selectedQuery.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactQuerry;
