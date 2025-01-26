import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderComponent from "../userHeader";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
const UploadPaymentComponent = () => {
  const navigate=useNavigate();
  const token = Cookies.get("jwtToken");
  const [paymentDetails, setPaymentDetails] = useState({
    admissionnumber: "",
    courseyear: "",
    phaseid: "",
    transactionid: "",
    amountpaid: "",
    paymentdate: "",
    receiptpath: "",
  });
  // Function to navigate to the Payment History page
const navigateToPaymentHistory = () => {
  // Example navigation logic (assuming you're using react-router-dom)
  console.log("Navigating to payment history...");
  navigate("/user/paymentsHistory"); // Replace with your actual route
};

// Function to trigger adding a new payment
const addNewPayment = () => {
  // Logic to initiate adding a new payment
  setShowModal(false); // Close the modal before starting a new payment
  // Additional logic to reset form or state if required
};

// Function to retry the operation
const tryAgain = () => {
  // Logic to retry the failed operation

  setShowModal(false); // Close the modal
  // Trigger the retry logic for the failed request
  // For example: re-submit a form or call an API
};

  const [errors, setErrors] = useState({
    amountpaid: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const response = await fetch("http://localhost:5001/api/user/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setPaymentDetails((prevState) => ({
              ...prevState,
              admissionnumber: data.profileInfo.admissionnumber || "",
            }));
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
      setPaymentDetails((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    } else {
      alert("Please upload a valid image or PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(paymentDetails.amountpaid) || paymentDetails.amountpaid === "") {
      setErrors((prevState) => ({
        ...prevState,
        amountpaid: "Amount paid must be a numeric value.",
      }));
      return;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        amountpaid: "",
      }));
    }

    if (
      !paymentDetails.courseyear ||
      !paymentDetails.phaseid ||
      !paymentDetails.transactionid ||
      !paymentDetails.amountpaid ||
      !paymentDetails.paymentdate ||
      !paymentDetails.receiptpath
    ) {
      alert("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("admissionnumber", paymentDetails.admissionnumber);
    formData.append("courseyear", paymentDetails.courseyear);
    formData.append("phaseid", paymentDetails.phaseid);
    formData.append("transactionid", paymentDetails.transactionid);
    formData.append("amountpaid", paymentDetails.amountpaid);
    formData.append("paymentdate", paymentDetails.paymentdate);
    formData.append("receiptpath", paymentDetails.receiptpath);

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5001/api/user/payment", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);
      if (response.ok) {
        setMessage("Payment successfully uploaded!");
        setShowModal(true);
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to upload payment details.");
        setShowModal(true);
      }
    } catch (error) {
      setIsLoading(false);
      setMessage("Failed to submit payment details.");
      setShowModal(true);
    }
    finally{
      setPaymentDetails({  
        courseyear: "",
        phaseid: "",
        transactionid: "",
        amountpaid: "",
        paymentdate: "",
        receiptpath: "",});

    }
  };

  return (
    <>
      <HeaderComponent />
      <div
        className={`relative ${
          isLoading || showModal ? "blur-sm" : ""
        } max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md`}
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Upload Payment Information</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-md text-left font-medium text-gray-700 mb-2">
              Admission Number
            </label>
            <input
              type="text"
              value={paymentDetails.admissionnumber}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div>
            <label className="block text-md text-left font-medium text-gray-700 mb-2">
              Course Year
            </label>
            <select
              name="courseyear"
              value={paymentDetails.courseyear || "select Year"}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="select Year" disabled>
                Select Year
              </option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="E1">E1</option>
              <option value="E2">E2</option>
              <option value="E3">E3</option>
              <option value="E4">E4</option>
            </select>
          </div>

          <div>
            <label className="block text-md text-left font-medium text-gray-700 mb-2">
              Phase ID
            </label>
            <select
              name="phaseid"
              value={paymentDetails.phaseid || "select Phase"}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="select Phase" disabled>
                Select Phase
              </option>
              <option value="1">Vidya Deevena Phase 1</option>
              <option value="2">Vidya Deevena Phase 2</option>
              <option value="3">Vidya Deevena Phase 3</option>
              <option value="4">Vidya Deevena Phase 4</option>
              <option value="5">Vasati Deevena</option>
            </select>
          </div>

          <div>
            <label className="block text-md text-left font-medium text-gray-700 mb-2">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionid"
              placeholder="Enter transaction id"
              value={paymentDetails.transactionid}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-md text-left font-medium text-gray-700 mb-2">
              Amount Paid
            </label>
            <input
              type="text"
              name="amountpaid"
              placeholder="Enter amount"
              value={paymentDetails.amountpaid}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errors.amountpaid && (
              <div className="text-red-500 text-sm mt-1">{errors.amountpaid}</div>
            )}
          </div>

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

          <div>
            <label className="block text-md text-left font-medium text-gray-700 mb-2">
              Upload Receipt (Image or PDF)
            </label>
            <input
              type="file"
              name="receiptpath"
              onChange={handleFileChange}
              className="input w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Upload Payment
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <ClipLoader color="#2563eb" size={50} />
        </div>
      )}

{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
    <div className="bg-white p-6 rounded shadow-lg text-center">
      <h3
        className={`text-xl font-semibold ${
          message.includes("successfully") ? "text-green-600" : "text-red-600"
        }`}
      >
        {message}
      </h3>
      <div className="flex justify-center mt-4">
        {message.includes("successfully") ? (
          <>
            <button
              onClick={addNewPayment}
              className="btn btn-primary mx-2"
            >
              Add New Payment
            </button>
            <button
              onClick={navigateToPaymentHistory}
              className="btn btn-accent mx-2"
            >
              View Payment History
            </button>
          </>
        ) : (
          <button
            onClick={tryAgain}
            className="btn btn-secondary mx-2"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default UploadPaymentComponent;
