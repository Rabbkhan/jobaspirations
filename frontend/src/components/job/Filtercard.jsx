import React, { useState } from "react";

const Filtercard = () => {
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    salary: "",
  });

  const filterData = {
    locations: ["Bangalore", "Hyderabad", "Remote"],
    industries: ["IT", "Finance", "Healthcare"],
    salaries: ["₹0 - ₹50,000", "₹50,001 - ₹80,000", "₹80,001 - ₹1,20,000"],
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const renderRadioGroup = (type, options) => (
    <div className="mb-4">
      {" "}
      <p className="font-medium mb-2">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </p>
      {options.map((option, idx) => (
        <label key={idx} className="flex items-center mb-1 cursor-pointer">
          <input
            type="radio"
            name={type}
            value={option}
            checked={filters[type] === option}
            onChange={() => handleFilterChange(type, option)}
            className="mr-2 accent-primary"
          />
          {option}{" "}
        </label>
      ))}{" "}
      <label className="flex items-center cursor-pointer mt-1">
        <input
          type="radio"
          name={type}
          value=""
          checked={filters[type] === ""}
          onChange={() => handleFilterChange(type, "")}
          className="mr-2 accent-primary"
        />
        All{" "}
      </label>{" "}
    </div>
  );

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm w-full">
      {" "}
      <h2 className="font-semibold text-xl mb-4">Filter Jobs</h2>
      {renderRadioGroup("location", filterData.locations)}
      {renderRadioGroup("industry", filterData.industries)}
      {renderRadioGroup("salary", filterData.salaries)}
      <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition">
        Apply Filters
      </button>
    </div>
  );
};

export default Filtercard;
