import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentRowComponent({ paymentdate, transactionid,phasename, courseyear, amountpaid }) {
  const navigate = useNavigate();

  // Format the payment date
  const formattedDate = new Date(paymentdate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{formattedDate}</td>
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{transactionid}</td>
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{phasename}</td>
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{courseyear}</td>
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{amountpaid}</td>
      <td className="py-4 px-6 border-b border-gray-200">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => navigate("/user/paymentDetails")}
        >
          View
        </button>
      </td>
    </tr>
  );
}

export default PaymentRowComponent;
