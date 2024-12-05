import React, { useState, useEffect } from "react";

const TripsList = ({ onSelectTrip }) => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const url = "https://tripapi.cphbusinessapps.dk/api/trips";

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setTrips(data);
      setFilteredTrips(data);
    };

    fetchTrips();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "") {
      setFilteredTrips(trips);
    } else {
      const filtered = trips.filter((trip) => trip.category === category);
      setFilteredTrips(filtered);
    }
  };

  const calculateDuration = (starttime, endtime) => {
    const startDate = new Date(starttime);
    const endDate = new Date(endtime);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Trips</h2>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="categoryFilter" style={{ marginRight: "10px" }}>
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ padding: "5px" }}
        >
          <option value="">All Categories</option>
          <option value="CITY">City</option>
          <option value="BEACH">Beach</option>
          <option value="SNOW">Snow</option>
          <option value="LAKE">Lake</option>
          <option value="SEA">Sea</option>
          <option value="FOREST">Forest</option>
        </select>
      </div>
      <div>
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => onSelectTrip(trip)} // Call onSelectTrip when a trip is clicked
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "10px",
              padding: "10px",
              width: "100%",
              maxWidth: "400px",
              cursor: "pointer",
            }}
          >
            <h3>{trip.name}</h3>
            <p>
              <strong>Start Date:</strong> {new Date(trip.starttime).toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong> {new Date(trip.endtime).toLocaleDateString()}
            </p>
            <p>
              <strong>Price:</strong> ${trip.price}
            </p>
            <p>
              <strong>Duration:</strong> {calculateDuration(trip.starttime, trip.endtime)} days
            </p>
            <p>
              <strong>Category:</strong> {trip.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripsList;
