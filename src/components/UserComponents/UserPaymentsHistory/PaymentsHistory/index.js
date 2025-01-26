import React, { useState, useEffect } from "react";
import PaymentsHistoryFiltersComponent from "../PaymentsHistoryFilters";
import PaymentRowComponent from "../PaymentsHistoryRow";
import HeaderComponent from "../../userHeader";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

function PaymentsHistoryComponent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPaymentsHistory = async () => {
    setLoading(true);
    try {
      const jwtToken = Cookies.get("jwtToken");
      let apiUrl = "http://localhost:5001/api/user/payment/history";
      const params = new URLSearchParams();

      if (search) params.append("searchQuery", search);
      if (filter !== "All") {
        if (["Vidya Deevena", "Vasati Deevena"].includes(filter)) {
          params.append("paymenttype", filter);
        } else if (["Accepted", "Pending", "Rejected"].includes(filter)) {
          params.append("verifiedstatus", filter);
        }
      }

      if (params.toString()) apiUrl += `?${params.toString()}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch payment history");

      const data = await response.json();
      setPayments(data.payments || []);
      setMessage(
        data.payments?.length
          ? ""
          : "No payment history records found."
      );
    } catch (error) {
      console.error(error.message);
      setMessage("Error fetching payment history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentsHistory();
  }, [search, filter]);

  return (
    <>
      <HeaderComponent />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-8">
        <h2 className="text-2xl text-left font-bold text-gray-800 mb-6">
          Payment History
        </h2>
        <PaymentsHistoryFiltersComponent
          onSearch={setSearch}
          onFilter={setFilter}
        />
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <ClipLoader color="#2563eb" size={50} />
          </div>
        ) : (
          <div className="overflow-x-auto mt-6">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="text-gray-600 uppercase text-sm">
                <tr>
                  <th className="py-4 px-6 border-b">Submitted Date</th>
                  <th className="py-4 px-6 border-b">Phase Type</th>
                  <th className="py-4 px-6 border-b">Course Year</th>
                  <th className="py-4 px-6 border-b">Amount</th>
                  <th className="py-4 px-6 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {message ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      {message}
                    </td>
                  </tr>
                ) : (
                  payments.map((payment, index) => (
                    <PaymentRowComponent key={index} {...payment} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default PaymentsHistoryComponent;
