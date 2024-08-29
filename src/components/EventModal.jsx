import React from "react";

const EventModal = ({ data, onClose }) => {
  const formatTours = (tours) => {
    return tours.map((tour, index) => (
      <div key={index} className="tour-detail">
        <p>
          <strong>Date:</strong> {new Date(tour.date).toDateString()}
        </p>
        <p>
          <strong>Time:</strong> {tour.time}
        </p>
      </div>
    ));
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <h2>Tour Details</h2>
        <div className="tour-details-container">
          {data.tours.length > 0 ? (
            formatTours(data.tours)
          ) : (
            <p>No tour details available.</p>
          )}
        </div>
        <button onClick={() => (window.location.href = data.url)}>
          Schedule a Tour
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </>
  );
};

export default EventModal;
