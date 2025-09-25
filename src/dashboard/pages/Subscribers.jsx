import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../../config/config";
import toast from "react-hot-toast";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(`${base_url}/api/getSubscribers`);
      setSubscribers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="relative overflow-x-auto p-4 w-full">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Subscribers</h2>
      <table className="min-w-[500px] w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.length > 0 ? (
            subscribers.map((subscriber, index) => (
              <tr
                key={subscriber._id}
                className="bg-white border-b text-center"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{subscriber.email}</td>
                <td className="px-4 py-2">{subscriber.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2 text-center">
                No subscribers available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Subscribers;
