function PaymentRowComponent({ submitteddate, phasename, courseyear, amount, status }) {
  const statusClass =
    status === "Accepted" ? "text-green-600 bg-green-100" : status === "Rejected" ? "text-red-600 bg-red-100" : "text-yellow-600 bg-yellow-100";

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{submitteddate}</td>
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{phasename}</td>
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{courseyear}</td>
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{amount}</td>
      <td className="py-4 px-6 border-b border-gray-200">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

export default PaymentRowComponent;
