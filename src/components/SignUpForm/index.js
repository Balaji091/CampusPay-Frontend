import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    yearOfStudy: "",
    admissionNumber: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^rs\d{6}@rguktsklm\.ac\.in$/;
    return emailRegex.test(email);
  };
  

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateAdmissionNumber = (admissionNumber) => {
    const admissionRegex = /^(rs|s)\d{6}$/;
    return admissionRegex.test(admissionNumber);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, department, yearOfStudy, admissionNumber, password } = formData;

    if (!name || !email || !phone || !department || !yearOfStudy || !admissionNumber || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format. Use rs123456@rguktsklm.ac.in.");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setErrorMessage("Phone number must be 10 digits.");
      return;
    }

    if (!validateAdmissionNumber(admissionNumber)) {
      setErrorMessage("Admission number must start with 'rs' or 's' followed by 6 digits.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, including uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/user/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json( );
      if (response.status === 201) {
        navigate("/user/login");
      } else {
        setErrorMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Section */}
      <div className="md:w-1/2 flex justify-center items-center bg-white">
        <img
          src="/login_avatar.avif"
          alt="Signup Avatar"
          className="w-2/3 h-auto object-contain"
        />
      </div>

      {/* Form Section */}
      <div className="flex flex-col md:w-1/2 items-center py-10 px-6 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {[
            { id: "name", placeholder: "Full Name", type: "text" },
            { id: "email", placeholder: "Email Address", type: "email" },
            { id: "phone", placeholder: "Phone Number", type: "text" },
            { id: "admissionNumber", placeholder: "Admission Number", type: "text" },
            { id: "password", placeholder: "Password", type: "password" },
          ].map(({ id, placeholder, type }) => (
            <div key={id} className="mb-4">
              <input
                id={id}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                required
              />
            </div>
          ))}

          {/* Department Dropdown */}
          <div className="mb-4">
            <select
              id="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
              <option value="eee">EEE</option>
              <option value="mech">MECH</option>
              <option value="civil">CIVIL</option>
            </select>
          </div>

          {/* Year of Study Dropdown */}
          <div className="mb-6">
            <select
              id="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            >
              <option value="" disabled>
                Select Year of Study
              </option>
              <option value="p1">P1</option>
              <option value="p2">P2</option>
              <option value="e1">E1</option>
              <option value="e2">E2</option>
              <option value="e3">E3</option>
              <option value="e4">E4</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        {errorMessage && (
          <p className="bg-red-100 text-left text-red-600 px-4 py-2 mb-4 rounded-md text-sm">
            {errorMessage}
          </p>
        )}

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/user/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
 