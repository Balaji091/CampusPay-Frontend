import React, { useState } from "react";
import HeaderComponent from "../userHeader";

const UploadPaymentComponent = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    admissionnumber: "s200091",
    courseyear: "E2",
    phaseid: 1,
    transactionid: "TB23948982",
    amountpaid: "11250.00",
    paymentdate: "2024-12-07", // Updated to reflect date format
    receiptpath: "", // File will be uploaded here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: files[0], // Store the first selected file
    }));
  };

  return (
    <>
      <HeaderComponent />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800">
            Upload Payment Information
          </h3>
        </div>

        <div className="flex flex-col gap-8">
          {/* Payment Information Form */}
          <div className="w-full">
            <form className="space-y-4">
              {/* Admission Number */}
              <div>
                <label className="block text-md text-left font-medium text-gray-700 mb-2">
                  Admission Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your admission number"
                  value={paymentDetails.admissionnumber}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>

              {/* Course Year */}
              <div>
                <label className="block text-md text-left font-medium text-gray-700 mb-2">
                  Course Year
                </label>
                <select
                  name="courseyear"
                  value={paymentDetails.courseyear}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                  <option value="E1">E1</option>
                  <option value="E2">E2</option>
                  <option value="E3">E3</option>
                  <option value="E4">E4</option>
                </select>
              </div>

              {/* Phase ID */}
              <div>
                <label className="block text-md text-left font-medium text-gray-700 mb-2">
                  Phase ID
                </label>
                <select
                  name="phaseid"
                  value={paymentDetails.phaseid}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="1">Vidya Deevena Phase 1</option>
                  <option value="2">Vidya Deevena Phase 2</option>
                  <option value="3">Vidya Deevena Phase 3</option>
                  <option value="4">Vidya Deevena Phase 4</option>
                  <option value="5">Vasati Deevena</option>
                </select>
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-md text-left font-medium text-gray-700 mb-2">
                  Transaction ID
                </label>
                <input
                  type="text"
                  placeholder="Enter your transaction ID"
                  value={paymentDetails.transactionid}
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
              </div>

              {/* Amount Paid */}
              <div>
                <label className="block text-md text-left font-medium text-gray-700 mb-2">
                  Amount Paid
                </label>
                <input
                  type="text"
                  placeholder="Enter the amount paid"
                  value={paymentDetails.amountpaid}
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
              </div>

              {/* Payment Date (updated to type 'date') */}
              <div>
                <label className="block text-md text-left font-medium text-gray-700 mb-2">
                  Payment Date
                </label>
                <input
                  type="date"
                  name="paymentdate"
                  value={paymentDetails.paymentdate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Receipt Upload */}
              <div>
                <label className="block text-md text-left font-medium text-gray-700 mb-2">
                  Upload Receipt
                </label>
                <input
                  type="file"
                  name="receiptpath"
                  onChange={handleFileChange}
                  className="input  w-full"
                />
              </div>

              {/* Upload Payment Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
              >
                Upload Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPaymentComponent;
