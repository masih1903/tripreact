import React, { useEffect, useState } from "react";

const PackingItems = ({ tripId }) => {
  const [packingItems, setPackingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tripId) return;

    const fetchPackingItems = async () => {
      try {
        setLoading(true);

        // Using the correct endpoint pattern
        const response = await fetch(
          `https://tripapi.cphbusinessapps.dk/api/trips/${tripId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch packing items.");
        }
        const data = await response.json();

        // Assuming `data.packingItems` contains the packing items
        if (data.packingItems) {
          setPackingItems(data.packingItems);
        } else {
          setPackingItems([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackingItems();
  }, [tripId]);

  if (!tripId) {
    return null;
  }

  if (loading) {
    return <p>Loading packing items...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Packing Items</h3>
      {packingItems.length === 0 ? (
        <p>No packing items available for this trip.</p>
      ) : (
        <ul>
          {packingItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PackingItems;
