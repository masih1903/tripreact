import React from "react";
import PackingItems from "./PackingItems";

const TripDetails = ({ trip }) => {
  if (!trip) {
    return <div style={{ padding: "20px" }}>Select a trip to view details.</div>;
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Trip Details</h2>
      <p>
        <strong>Name:</strong> {trip.name}
      </p>
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
        <strong>Category:</strong> {trip.category}
      </p>
      {trip.guide && (
        <>
          <h3>Guide Information</h3>
          <p>
            <strong>Name:</strong> {trip.guide.name}
          </p>
          <p>
            <strong>Email:</strong> {trip.guide.email}
          </p>
          <p>
            <strong>Phone:</strong> {trip.guide.phone}
          </p>
          <p>
            <strong>Years of Experience:</strong> {trip.guide.experience} years
          </p>
        </>
      )}
      <PackingItems tripId={trip.id} />
    </div>
  );
};

export default TripDetails;
