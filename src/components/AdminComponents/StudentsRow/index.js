import React from "react";
import { useNavigate } from "react-router-dom";

function StudentRowComponent({
  name,
  admissionnumber,
  email,
  yearofstudy,
  department,
  viewDetailsLink,
}) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(viewDetailsLink);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-6 border-b border-gray-200 text-left text-gray-700">{name}</td>
      <td className="py-4 px-6 border-b border-gray-200  text-left text-gray-700">{admissionnumber}</td>
      <td className="py-4 px-6 border-b border-gray-200 text-left text-gray-700">{email}</td>
      <td className="py-4 px-6 border-b border-gray-200  text-left text-gray-700">{yearofstudy}</td>
      <td className="py-4 px-6 border-b border-gray-200  text-left text-gray-700">{department}</td>
      <td className="py-4 px-6 border-b border-gray-200">
        <button
          className=" text-blue-500 hover:underline"
          onClick={handleViewClick}
        >
          View 
        </button>
      </td>
    </tr>
  );
}

export default StudentRowComponent;
