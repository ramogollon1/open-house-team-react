import React, { useState } from "react";
import Spinner from "../components/Spinner";

import "./styles.css";

const LandingPage = ({ listings, onSelectListing }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectListing = (listing) => {
    setLoading(true);
    try {
      onSelectListing(listing);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableOpenHouseDays = (openHouses) => {
    if (!openHouses || openHouses.length === 0)
      return "No open houses available.";

    const today = new Date();
    const formattedOpenHouses = openHouses.map((openHouse) => {
      const openHouseDate = new Date(openHouse.date);
      const isToday = openHouseDate.toDateString() === today.toDateString();
      const formattedDate = openHouseDate.toLocaleDateString();
      const formattedTime = openHouse.time;

      return `${formattedDate} at ${formattedTime}${isToday ? " (Today)" : ""}`;
    });

    return formattedOpenHouses.join(", ");
  };

  if (loading) return <Spinner />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="landing-page">
      <h1>Your Favorite Listings</h1>
      <div className="listings-container">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="listing-card"
            onClick={() => handleSelectListing(listing)}
          >
            <h2 className="listing-address">{listing.address}</h2>
            <p className="listing-details">
              {listing.city}, {listing.state} {listing.zipCode}
            </p>
            <p className="listing-price">${listing.price.toLocaleString()}</p>
            <p className="open-house-days">
              Open House Days: {getAvailableOpenHouseDays(listing.openHouses)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
