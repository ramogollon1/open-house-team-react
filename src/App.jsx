import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Spinner from "./components/Spinner";
import LandingPage from "./layouts/LandingPage";

const RETRY_LIMIT = 3;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState("list");

  useEffect(() => {
    const fetchListings = async (attempt = 1) => {
      try {
        const response = await fetch("/api/saved-listings");
        if (!response.ok) {
          throw new Error(`Failed to fetch listings: ${response.statusText}`);
        }
        const data = await response.json();
        setListings(data);
      } catch (err) {
        if (attempt < RETRY_LIMIT) {
          // Retry the request
          fetchListings(attempt + 1);
        } else {
          // Final attempt failed
          setError(`Error fetching listings: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleSelectListing = (listing) => {
    if (listing.id) {
      fetch(`/api/saved-listings/${listing.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch listing details: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          setSelectedListing(data);
          setView("calendar");
        })
        .catch((error) => {
          setError(`Error fetching listing details: ${error.message}`);
        });
    } else {
      console.error("Listing ID is missing");
    }
  };

  const handleBackToListings = () => {
    setSelectedListing(null);
    setView("list");
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Oops! Something went wrong.</h2>
          <p>
            We encountered an issue while fetching the data. Please try again
            later.
          </p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {view === "calendar" ? (
        <div className="calendar-container">
          <button className="back-button" onClick={handleBackToListings}>
            Back to Listings
          </button>
          {selectedListing && (
            <Calendar availableTourDays={selectedListing.openHouses} />
          )}
        </div>
      ) : (
        <LandingPage
          listings={listings}
          onSelectListing={handleSelectListing}
        />
      )}
    </div>
  );
};

export default App;
