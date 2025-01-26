import React, { useState, useEffect } from "react";
import HeaderComponent from "../userHeader";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import { Modal } from "daisyui";

const ProfileComponent = () => {
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    phone: "",
    admissionnumber: "",
    department: "",
    yearofstudy: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const apiUrl = "http://localhost:5001/api/user/profile";
      const jwtToken = Cookies.get("jwtToken");

      if (!jwtToken) {
        setError("Unauthorized: Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setProfileInfo(data.profileInfo || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:5001/api/user/profile";
    const jwtToken = Cookies.get("jwtToken");

    if (!jwtToken) {
      setError("Unauthorized: Please log in.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(profileInfo),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      setIsModalOpen(true); // Show modal on successful update
    } catch (err) {
      setError(err.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <ClipLoader color="#2563eb" size={50} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <>
    <HeaderComponent/>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl text-left font-bold text-gray-800">
            Manage your personal Information
          </h3>
        </div>

        <form className="space-y-6" onSubmit={handleSave}>
          <div>
            <label className="block text-md text-left font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profileInfo.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-left text-md font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profileInfo.email}
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <div>
            <label className="block text-left text-md font-medium text-gray-700 mb-2">
              Student Id
            </label>
            <input
              type="text"
              name="admissionnumber"
              value={profileInfo.admissionnumber}
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <div>
            <label className="block text-left text-md font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={profileInfo.phone}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-left text-md font-medium text-gray-700 mb-2">
              Branch
            </label>
            <select
              name="department"
              value={profileInfo.department}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="CCE">CCE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>
          <div>
            <label className="block text-left text-md font-medium text-gray-700 mb-2">
              Year of Study
            </label>
            <select
              name="yearofstudy"
              value={profileInfo.yearofstudy}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="E1">E1</option>
              <option value="E2">E2</option>
              <option value="E3">E3</option>
              <option value="E4">E4</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Save
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-blue-50">
            <h3 className="font-bold text-lg text-blue-500">
              Profile Updated Successfully!
            </h3>
            <p className="py-4 text-gray-700">
              Your profile details have been updated.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-primary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileComponent;
