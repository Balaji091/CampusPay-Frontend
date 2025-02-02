import React, { useState, useEffect } from "react";
import SideNavBar from "../AdminHeader";
import Cookies from "js-cookie";
import StudentRowComponent from "../StudentsRow";
import { FiSearch } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

export default function StudentsTable() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [branch, setBranch] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = "http://localhost:5001/api/admin/students";

  useEffect(() => {
    fetchStudents();
  }, [search, branch, yearOfStudy]);

  const fetchStudents = async () => {
    const adminToken = Cookies.get("adminJwtToken");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}?search=${search}&branch=${branch}&yearOfStudy=${yearOfStudy}`,
        options
      );
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data.studentsList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5">
        <SideNavBar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <h2 className="text-2xl font-semibold text-left mb-4">Students</h2>

        {/* Filters Section */}
        <div className="flex gap-4 mb-4">
          <div className="relative w-2/3">
            <input
              type="text"
              placeholder="Search by name or admission number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md p-2 w-full bg-gray-100 text-gray-700 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={18} />
          </div>

          <select
            className="border rounded-md p-2 w-1/6 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="">All Branches</option>
            <option value="cse">CSE</option>
            <option value="ece">ECE</option>
            <option value="mech">ME</option>
            <option value="civil">CIVIL</option>
            <option value="eee">EEE</option>
          </select>

          <select
            className="border rounded-md p-2 w-1/6 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={yearOfStudy}
            onChange={(e) => setYearOfStudy(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="p1">PUC 1</option>
            <option value="p2">PUC 2</option>
            <option value="e1">E1</option>
            <option value="e2">E2</option>
            <option value="e3">E3</option>
            <option value="e4">E4</option>
          </select>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center mt-4">
            <ClipLoader color="#3B82F6" size={50} />
          </div>
        ) : error ? (
          // Display Error Message
          <p className="text-center text-red-500">{error}</p>
        ) : students.length > 0 ? (
          // Students Table
          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Name</th>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Student ID</th>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Email</th>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Year</th>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Branch</th>
                  <th className="py-4 px-6 border-b text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <StudentRowComponent
                    key={index}
                    name={student.name}
                    admissionnumber={student.admissionnumber}
                    email={student.email}
                    yearofstudy={student.yearofstudy}
                    department={student.department}
                    viewDetailsLink={`/students/${student.admissionnumber}`}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Display "No data found" when there are no results
          <p className="text-center py-4 text-gray-500">No data found.</p>
        )}
      </div>
    </div>
  );
}
