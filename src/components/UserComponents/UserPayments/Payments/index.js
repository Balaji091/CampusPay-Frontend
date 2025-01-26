import React, { useState, useEffect } from "react";
import FiltersComponent from "../../UserPaymentsFilter";
import PaymentRowComponent from "../PaymentRow";
import HeaderComponent from "../../userHeader";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

function PaymentsComponent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const jwtToken = Cookies.get("jwtToken");
      let apiUrl = "http://localhost:5001/api/user/payment";
      const params = new URLSearchParams();

      if (search) params.append("transactionId", search);
      if (filter !== "All") {
        if (filter === "Vidya Deevena" || filter === "Vasati Deevena") {
          params.append("paymentType", filter);
        } else if (["P1", "P2", "E1", "E2", "E3", "E4"].includes(filter)) {
          params.append("courseYear", filter);
        }
      }

      if (params.toString()) apiUrl += `?${params.toString()}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const response = await fetch(apiUrl, options);
      if (!response.ok) throw new Error("Failed to fetch payments");

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [search, filter]);

  return (
    <>
      <HeaderComponent />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-8">
        <h2 className="text-2xl text-left font-bold text-gray-800 mb-6">
          Payment Receipts
        </h2>
        <FiltersComponent onSearch={setSearch} onFilter={setFilter} />
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <ClipLoader color="#2563eb" size={50} />
          </div>
        ) : (
          <div className="overflow-x-auto mt-6">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="text-gray-600 uppercase text-sm">
                <tr>
                  <th className="py-4 px-6 border-b border-gray-200">
                    Payment Date
                  </th>
                  <th className="py-4 px-6 border-b border-gray-200">
                    Transaction ID
                  </th>
                  <th className="py-4 px-6 border-b border-gray-200">
                    Phase Type
                  </th>
                  <th className="py-4 px-6 border-b border-gray-200">
                    Phase Year
                  </th>
                  <th className="py-4 px-6 border-b border-gray-200">Amount</th>
                  <th className="py-4 px-6 border-b border-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {message ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
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

export default PaymentsComponent;
