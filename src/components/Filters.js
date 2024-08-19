import React, { useState } from "react";

function Filters({ onTypeChange, onSearchChange }) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updatedTypes);
    onTypeChange(updatedTypes);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <span>Type</span>
        <div className="checkbox-group">
          {[
            "Small",
            "Medium",
            "Large",
            "Heliport",
            "Closed",
            "In your favorites",
          ].map((type) => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={() => handleCheckboxChange(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span>Filter by search</span>
        <input
          className="search-input"
          type="search"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default Filters;
