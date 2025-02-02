import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderComponent from "../AdminHeader";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

const AdminPaymentDetails = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paymentId) {
      setMessage("No payment ID provided");
      setLoading(false);
      return;
    }

    const fetchPaymentDetails = async () => {
      try {
        const jwtToken = Cookies.get("adminJwtToken");
        const apiUrl = `http://localhost:5001/api/admin/payments/${paymentId}`;

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const response = await fetch(apiUrl, options);
        const data = await response.json();

        if (response.ok) {
          setPayment(data.paymentDetails);
        } else {
          setMessage(data.message || "Error fetching payment details");
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setMessage("Error fetching payment details");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentId]);

  const handleDownload = () => {
    if (payment?.receiptpath) {
      const link = document.createElement("a");
      link.href = payment.receiptpath;
      link.download = "receipt.jpg"; // You can change the filename as needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <ClipLoader color="#2563eb" size={50} />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <HeaderComponent />
      <div className="flex flex-col lg:flex-row p-8 bg-white rounded-lg max-w-6xl mx-auto w-full gap-10 shadow-md">
        {/* Left Section - Payment Details */}
        <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-left font-semibold text-gray-800 mb-6 border-b pb-3">
            Payment Details
          </h2>
          {message ? (
            <div className="text-gray-600">{message}</div>
          ) : (
            <div className="space-y-4">
              {[
                ["Admission Number", payment.admissionnumber],
                ["Course Year", payment.courseyear],
                ["Transaction ID", payment.transactionid],
                ["Amount Paid", payment.amountpaid],
                ["Payment Date", new Date(payment.paymentdate).toLocaleString()],
                ["Verified Status", payment.verifiedstatus],
                ["Submitted Date", new Date(payment.submitteddate).toLocaleString()],
                ["Payment Type", payment.paymenttype],
                ["Phase Name", payment.phasename],
              ].map(([label, value], index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <span className="text-gray-700 font-medium">{label}:</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section - Receipt Image */}
        {payment?.receiptpath && (
          <div className="flex-1 mt-8 flex flex-col items-center">
            <a
              href={payment.receiptpath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={payment.receiptpath}
                alt="Receipt"
                className="rounded-lg shadow-md max-w-md object-contain transition-transform transform hover:scale-105 hover:shadow-lg cursor-zoom-in"
              />
            </a>
            <button
              onClick={handleDownload}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Download Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPaymentDetails;
