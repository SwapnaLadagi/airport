import React, { useState, useEffect } from "react";
import Filters from "./components/Filters";
import AirportTable from "./components/AirportTable";
import Pagination from "./components/Pagination";
import airportsData from "./data/airports.json";
import "./App.css";
import { SiWindows } from "react-icons/si";

function App() {
  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setAirports(airportsData);
    setFilteredAirports(airportsData);
  }, []);

  const applyFilters = (airportsList) => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return airportsList.slice(startIdx, endIdx);
  };

  const handleTypeFilterChange = (selectedTypes) => {
    if (selectedTypes.length === 0) {
      setFilteredAirports(airports);
      setCurrentPage(1);
      return;
    }
    const normalizedTypes = selectedTypes.map((type) => type.toLowerCase());
    const filtered = airports.filter((airport) => {
      const airportType = airport.type?.toLowerCase() || "";
      return normalizedTypes.includes(airportType);
    });

    setFilteredAirports(filtered);
    setCurrentPage(1);
  };

  const handleSearchChange = (searchTerm) => {
    const filtered = airports.filter((airport) => {
      const name = airport.name?.toLowerCase() || "";
      const icao = airport.icao?.toLowerCase() || "";
      const iata = airport.iata?.toLowerCase() || "";

      return (
        name.startsWith(searchTerm.toLowerCase()) ||
        icao.startsWith(searchTerm.toLowerCase()) ||
        iata.startsWith(searchTerm.toLowerCase())
      );
    });

    setFilteredAirports(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    let newPage = currentPage;
    const totalPages = Math.ceil(filteredAirports.length / itemsPerPage);
    if (direction === "next" && currentPage < totalPages) {
      newPage = currentPage + 1;
    } else if (direction === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    }
    setCurrentPage(newPage);
  };

  const paginatedAirports = applyFilters(filteredAirports);
  const totalResults = filteredAirports.length;

  return (
    <div className="App">
      <div className="title">
        <h1>
          Filter <span className="highlight">airports</span>
        </h1>
        <SiWindows />
      </div>
      <Filters
        onTypeChange={handleTypeFilterChange}
        onSearchChange={handleSearchChange}
      />
      <AirportTable airports={paginatedAirports} />
      <Pagination
        currentPage={currentPage}
        totalResults={totalResults}
        resultsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
