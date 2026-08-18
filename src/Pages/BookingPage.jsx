import React, { useState, useEffect } from "react";
import "../Styling/BookingPage.css";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";

export function SeatSelection({ eventId = "101" }) {
  const [eventDetails, setEventDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const userId = "user_client_abc123";

  useEffect(() => {
    if (!eventId) return;

    const fetchLayoutData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/events/${eventId}/seats`,
        );
        const data = await res.json();

        //  Ensure data.seats exists before calling methods on it
        if (data && Array.isArray(data.seats)) {
          setEventDetails(data);
          const matchingHolds = data.seats
            .filter((s) => s.status === "locked" && s.lockedBy === userId)
            .map((s) => s.id);
          setSelectedSeats(matchingHolds);
        } else {
          console.error("Invalid data structure received:", data);
        }
      } catch (err) {
        console.error("Layout error", err);
      }
    };

    fetchLayoutData();
  }, [eventId]);

  const handleSeatClick = async (seatId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${eventId}/book-seat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ seatId, userId }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      if (data.action === "locked") {
        setSelectedSeats((prev) => [...prev, seatId]);
      } else {
        setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
      }
    } catch (err) {
      console.error("Communication fault:", err);
    }
  };

  if (!eventDetails)
    return <div className="loading">Loading seating map...</div>;

  return (
    <div className="booking-container">
      <Navbar />
      <div className="card-interface">
        <div className="grid-section">
          <h3>Select Your Seats</h3>
          <div className="stage-screen">STAGE / SCREEN</div>

          <div
            className="seating-grid"
            style={{
              gridTemplateColumns: `repeat(${eventDetails.seatsPerRow}, minmax(30px, 1fr))`,
            }}
          >
            {eventDetails.seats.map((seat) => {
              const isSelected = selectedSeats.includes(seat.id);
              return (
                <div
                  key={seat.id}
                  className={`seat ${isSelected ? "selected" : seat.status}`}
                  onClick={() => handleSeatClick(seat.id)}
                >
                  {seat.id}
                </div>
              );
            })}
          </div>
        </div>

        <div className="summary-section">
          <h3>Ticket Overview</h3>
          <p className="event-title">{eventDetails.eventName}</p>
          <p>Seats Selected: {selectedSeats.length}</p>
        </div>
      </div>
    </div>
  );
}

function BookingPage() {
  // Grab the dynamic parameter from the URL path (matching /bookings/:id or /bookings/:_id)
  const { id } = useParams();

  // Pass the dynamic id into SeatSelection
  return <SeatSelection eventId={id} />;
}

export default BookingPage;
