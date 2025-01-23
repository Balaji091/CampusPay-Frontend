import React from "react";
import HeaderComponent from "../userHeader";
import { useEffect } from "react";
const ProfileComponent = () => {
  // Sample data
  const profileInfo = {
    name: "Pani",
    email: "chokkarabalaji@gmail.com",
    phone: "8074163248",
    department: "CCE",
    yearofstudy: "E3",
    admissionnumber: "S200091",
  };
  useEffect(()=>{
    const fetchProfileDetails=async()=>{
      
    }
  })


  return (
    <>
    <HeaderComponent/>
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md ">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800">
          Manage your personal information
        </h3>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Profile Information Form */}
        <div className="w-full">
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-md text-left font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                defaultValue={profileInfo.name}
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-md text-left font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                defaultValue={profileInfo.email}
                className="input input-bordered w-full"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-md text-left font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                defaultValue={profileInfo.phone}
                className="input input-bordered w-full"
              />
            </div>

            {/* Admission Number */}
            <div>
              <label className="block text-md text-left font-medium text-gray-700 mb-2">
                Admission Number
              </label>
              <input
                type="text"
                placeholder="Enter admission number"
                defaultValue={profileInfo.admissionnumber}
                className="input input-bordered w-full"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block text-md text-left font-medium text-gray-700 mb-2">
                Branch
              </label>
              <select
                defaultValue={profileInfo.department}
                className="select select-bordered w-full"
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="CCE">CCE</option>
                <option value="MECH">MECH</option>
              </select>
            </div>

            {/* Year of Study */}
            <div>
              <label className="block text-md text-left font-medium text-gray-700 mb-2">
                Year of Study
              </label>
              <select
                defaultValue={profileInfo.yearofstudy}
                className="select select-bordered w-full"
              >
                <option value="E1">E1</option>
                <option value="E2">E2</option>
                <option value="E3">E3</option>
                <option value="E4">E4</option>
              </select>
            </div>

            {/* Save Button */}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfileComponent;
    