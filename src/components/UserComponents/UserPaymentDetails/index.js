import React from 'react';
import HeaderComponent from '../userHeader';

const PaymentDetails = () => {
  // Sample payment data
  const payment = {
    admissionnumber: "s200091",
    courseyear: "E2",
    phaseid: 1,
    transactionid: "TB23948982",
    amountpaid: "11250.00",
    paymentdate: "2024-12-07T18:30:00.000Z",
    receiptpath: "https://res.cloudinary.com/dktio4phw/image/upload/v1735213585/studentPhees/zqgnys6pkodkzpmkhibn.jpg",
    verifiedstatus: "Accepted",
    paymentid: "13c64cbc-14ec-4d8b-8fed-f2ff186869db",
    submitteddate: "2024-12-26T11:46:26.147Z"
  };

  return (
    <>
    <HeaderComponent/>
    <div className="p-8 bg-white rounded-lg mt-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 text-left mb-6">Payment Details</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left half - Payment details */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Admission Number:</span>
            <span className="text-gray-900">{payment.admissionnumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Course Year:</span>
            <span className="text-gray-900">{payment.courseyear}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Transaction ID:</span>
            <span className="text-gray-900">{payment.transactionid}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Amount Paid:</span>
            <span className="text-gray-900">{payment.amountpaid}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Payment Date:</span>
            <span className="text-gray-900">{new Date(payment.paymentdate).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Verified Status:</span>
            <span className="text-gray-900">{payment.verifiedstatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Submitted Date:</span>
            <span className="text-gray-900">{new Date(payment.submitteddate).toLocaleString()}</span>
          </div>
        </div>

        {/* Right half - Receipt image and download button */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-w-xs">
            <img src={payment.receiptpath} alt="Receipt" className="w-full h-auto rounded-lg " />
          </div>
          <a
            href={payment.receiptpath}
            download
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
          >
            Download Receipt
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentDetails;
