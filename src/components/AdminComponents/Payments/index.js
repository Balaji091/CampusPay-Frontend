import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNavBar from "../AdminHeader";
import Cookies from "js-cookie";
import { FiSearch } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

export default function PaymentsTable() {
  const [search, setSearch] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:5001/api/admin/payments";

  useEffect(() => {
    fetchPayments();
  }, [search, verifiedStatus]);

  const fetchPayments = async () => {
    const adminToken = Cookies.get("adminJwtToken");

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}?searchQuery=${search}&verifiedstatus=${verifiedStatus}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch payment records");

      const data = await response.json();
      setPayments(data.payments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(payments)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5">
        <SideNavBar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <h2 className="text-2xl font-semibold text-left mb-4">Payments History</h2>

        {/* Filters Section */}
        <div className="flex gap-4 mb-4">
          {/* Search Input */}
          <div className="relative w-2/3">
            <input
              type="text"
              placeholder="Search by Phase Name or Course Year"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md p-2 w-full bg-gray-100 text-gray-700 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={18} />
          </div>

          {/* Verified Status Filter */}
          <select
            className="border rounded-md p-2 w-1/6 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={verifiedStatus}
            onChange={(e) => setVerifiedStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Accepted">Accepted</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center mt-4">
            <ClipLoader color="#3B82F6" size={50} />
          </div>
        ) : error ? (
          // Display Error Message
          <p className="text-center text-red-500">{error}</p>
        ) : payments.length > 0 ? (
          // Payments Table
          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Student</th>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Fee Year</th>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Phase Name</th>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Submitted Date</th>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Status</th>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 text-left px-6 border-b">{payment.admissionnumber}</td>
                    <td className="py-4 text-left px-6 border-b">{payment.courseyear}</td>
                    <td className="py-4 text-left px-6 border-b">{payment.phasename}</td>
                    <td className="py-4 text-left px-6 border-b">{new Date(payment.submitteddate).toLocaleDateString()}</td>
                    <td className="py-4 text-left px-6 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          payment.verifiedstatus === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : payment.verifiedstatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.verifiedstatus}
                      </span>
                    </td>
                    {/* View Details Button */}
                    <td className="py-4 text-left px-6 border-b">
                      <button
                        className=" text-primary  "
                        onClick={() => navigate(`/admin/payments/${payment.paymentid}`)}
                      >
                        View 
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Display "No data found" when there are no results
          <p className="text-center py-4 text-gray-500">No payment records found.</p>
        )}
      </div>
    </div>
  );
}
