import React from "react";

const Filtercard = ({ filters, setFilters }) => {
  const filterData = {
    locations: ["Bangalore", "Hyderabad", "Remote"],
    industries: ["IT", "Finance", "Healthcare"],
    salaries: ["0-50000", "50001-80000", "80001-120000"],
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const renderRadioGroup = (type, options, labelFormatter = (v) => v) => (
    <div className="mb-4">
      <p className="font-medium mb-2">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </p>

      {options.map((option, idx) => (
        <label key={idx} className="flex items-center mb-1 cursor-pointer">
          <input
            type="radio"
            name={type}
            checked={filters[type] === option}
            onChange={() => handleFilterChange(type, option)}
            className="mr-2 accent-primary"
          />
          {labelFormatter(option)}
        </label>
      ))}

      <label className="flex items-center cursor-pointer mt-1">
        <input
          type="radio"
          name={type}
          checked={filters[type] === ""}
          onChange={() => handleFilterChange(type, "")}
          className="mr-2 accent-primary"
        />
        All
      </label>
    </div>
  );

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm w-full">
      <h2 className="font-semibold text-xl mb-4">Filter Jobs</h2>

      {renderRadioGroup("location", filterData.locations)}
      {renderRadioGroup("industry", filterData.industries)}
      {renderRadioGroup(
        "salary",
        filterData.salaries,
        (v) => `₹${v.replace("-", " - ₹")}`
      )}
    </div>
  );
};

export default Filtercard;
