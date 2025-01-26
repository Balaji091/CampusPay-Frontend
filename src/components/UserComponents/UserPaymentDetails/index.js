import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../userHeader';
import Cookies from 'js-cookie';
import { ClipLoader } from "react-spinners";

const PaymentDetails = () => {
  const { paymentId } = useParams(); // Get the paymentId from the route params
  const [payment, setPayment] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paymentId) {
      setMessage('No payment ID provided');
      setLoading(false);
      return;
    }

    const fetchPaymentDetails = async () => {
      try {
        const jwtToken = Cookies.get('jwtToken');
        const apiUrl = `http://localhost:5001/api/user/payment/${paymentId}`;

        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const response = await fetch(apiUrl, options);
        const data = await response.json();

        if (response.ok) {
          setPayment(data.paymentDetails[0]); // Assuming the first entry in the response
        } else {
          setMessage(data.message || 'Error fetching payment details');
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
        setMessage('Error fetching payment details');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentId]);

  if (loading) {
    return   <div className="flex items-center justify-center h-screen bg-gray-100">
    <ClipLoader color="#2563eb" size={50} />
  </div>;
  }

  return (
    <>
      <HeaderComponent />
      <div className="p-8 bg-white rounded-lg mt-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 text-left mb-6">Payment Details</h2>
        {message ? (
          <div className="text-center text-gray-600">{message}</div>
        ) : (
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
                <span className="text-gray-900">
                  {new Date(payment.paymentdate).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Verified Status:</span>
                <span className="text-gray-900">{payment.verifiedstatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Submitted Date:</span>
                <span className="text-gray-900">
                  {new Date(payment.submitteddate).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Right half - Receipt image and download button */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-full max-w-xs">
                <img
                  src={payment.receiptpath}
                  alt="Receipt"
                  className="w-full h-auto rounded-lg"
                />
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
        )}
      </div>
    </>
  );
};

export default PaymentDetails;
