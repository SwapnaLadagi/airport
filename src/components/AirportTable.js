import React from "react";

function AirportTable({ airports }) {
  function convertDDToDMS(dd, isLatitude) {
    const direction =
      dd >= 0 ? (isLatitude ? "N" : "E") : isLatitude ? "S" : "W";

    const absoluteDD = Math.abs(dd);
    const degrees = Math.floor(absoluteDD);
    const minutesFloat = (absoluteDD - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60);

    return `${direction}${degrees}°${minutes}.${seconds}'`;
  }

  return (
    <table className="airport-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>ICAO</th>
          <th>IATA</th>
          <th>Elev.</th>
          <th>Lat.</th>
          <th>Long.</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {airports.map((airport, index) => (
          <tr key={index}>
            <td>{airport.name}</td>
            <td>{airport.icao}</td>
            <td>{airport.iata}</td>
            <td>{airport.elevation}</td>
            <td>{convertDDToDMS(airport.latitude, true)}</td>
            <td>{convertDDToDMS(airport.longitude, false)}</td>
            <td>{airport.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AirportTable;
