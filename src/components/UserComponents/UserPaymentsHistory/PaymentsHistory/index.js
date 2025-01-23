import React, { useState, useEffect } from "react";
import PaymentRowComponent from "../PaymentsHistoryRow";
import PaymentsHistoryFiltersComponent from "../PaymentsHistoryFilters";
import HeaderComponent from "../../userHeader";
import Cookies from "js-cookie";

function PaymentsHistoryComponent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ phaseType: "All",verifiedStatus:"All" });
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        let apiUrl = "http://localhost:5001/api/user/payment/history";

        // Append query parameters based on search and filters
        const params = new URLSearchParams();

        if (search) {
          params.append("searchQuery", search);
        }

        if (filter.phaseType !== "All") {
          params.append("paymenttype", filter.phaseType);
        }

        if (filter.verifiedStatus !== "All") {
          params.append("verifiedstatus", filter.verifiedStatus);
        }

        if (params.toString()) {
          apiUrl += `?${params.toString()}`;
        }

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const response = await fetch(apiUrl, options);
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data = await response.json();

        if (!data.payments || data.payments.length === 0) {
          setMessage("No payment records found");
        } else {
          setPayments(data.payments);
          setMessage("");
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
        setMessage("Error fetching payment data");
      }
    };

    fetchPayments();
  }, [search, filter]);

  const handleFilter = (type, value) => {
    setFilter((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <>
      <HeaderComponent />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-8">
        <h2 className="text-2xl text-left font-bold text-gray-800 mb-6">Payments History</h2>
        <PaymentsHistoryFiltersComponent
          onSearch={setSearch}
          onFilter={handleFilter}
        />
        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-4 px-6 border-b border-gray-200">SUBMITTED_DATE</th>
                <th className="py-4 px-6 border-b border-gray-200">PHASE_Type</th>
                <th className="py-4 px-6 border-b border-gray-200">YEAR</th>
                <th className="py-4 px-6 border-b border-gray-200">Amount</th>
                <th className="py-4 px-6 border-b border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {message ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">{message}</td>
                </tr>
              ) : (
                payments.map((payment, index) => (
                  <PaymentRowComponent key={index} {...payment} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PaymentsHistoryComponent;
