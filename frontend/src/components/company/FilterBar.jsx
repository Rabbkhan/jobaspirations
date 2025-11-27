// components/company/FilterBar.jsx
import React from "react";
import { Input } from "@/components/ui/input";

const FilterBar = ({ data, search, setSearch, location, setLocation }) => {
  const uniqueLocations = ["All", ...new Set(data.map((c) => c.location))];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input
        placeholder="Search companies…"
        className="md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border border-border rounded-lg p-2 bg-background md:w-1/4"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        {uniqueLocations.map((loc, i) => (
          <option key={i}>{loc}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
