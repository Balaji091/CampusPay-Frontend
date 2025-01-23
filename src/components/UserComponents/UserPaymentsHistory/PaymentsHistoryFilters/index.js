  import React from "react";
  import { FaSearch } from "react-icons/fa";

  function PaymentsHistoryFiltersComponent({ onSearch, onFilter }) {
    const categories = [
      { label: "All", type: "all", value: "All" },
      { label: "Vidya Deevena", type: "paymentType", value: "Vidya Deevena" },
      { label: "Vasati Deevena", type: "paymentType", value: "Vasati Deevena" },
      { label: "Accepted", type: "verifiedStatus", value: "Accepted" },
      { label: "Pending", type: "verifiedStatus", value: "Pending" },
      { label: "Rejected", type: "verifiedStatus", value: "Rejected" },
    ];

    return (
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <FaSearch className="absolute top-5 left-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search for a payment receipt"
            className="w-full pl-12 py-4 rounded-lg bg-gray-100 text-gray-800 focus:outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={`${category.type}-${category.value}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
              onClick={() => onFilter(category.type, category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  export default PaymentsHistoryFiltersComponent;
