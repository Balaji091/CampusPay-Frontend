import React from "react";
import { FaSearch } from "react-icons/fa";

function FiltersComponent({ onSearch, onFilter }) {
  const categories = ["All", "Vidya Deevena", "Vasati Deevena", "P1", "P2", "E1", "E2", "E3", "E4"];

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

      {/* Filter Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none"
            onClick={() => onFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FiltersComponent;
