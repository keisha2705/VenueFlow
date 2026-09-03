import React, { useState, useEffect } from "react";
import "../Styling/BookingPage.css";
import Navbar from "../Components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import Checkout from "./Checkout";

export function SeatSelection({ eventId }) {
  const [eventDetails, setEventDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "user_client_abc123";

  useEffect(() => {
    if (!eventId) return;
    const fetchLayoutData = async () => {
      try {
        const token = localStorage.getItem("token");
        // 1. Fetch data from your layout endpoint
        const res = await fetch(
          `http://localhost:3000/events/${eventId}/seats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const data = await res.json();

        // Aligned check: Ensure we receive the core structural data fields from our joined collections
        if (data && data.rows && data.seatsPerRow) {
          setEventDetails(data);

          // Fallback array if no bookings exist yet
          const activeBookings = data.seats || [];

          const matchingHolds = activeBookings
            .filter((s) => s.status === "locked" && s.lockedBy === userId)
            .map((s) => s.id);
          setSelectedSeats(matchingHolds);
        } else {
          console.error(
            "Invalid structural configuration layout data received:",
            data,
          );
        }
      } catch (err) {
        console.error("Layout error", err);
      }
    };
    fetchLayoutData();
  }, [eventId, userId]);

  const handleSeatClick = async (seatId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/events/${eventId}/book-seat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ seatId, userId }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Could not lock seat.");
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

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before confirming.");
      return;
    }
    // Seats are already locked server-side via handleSeatClick above.
    // Payment (and the actual booking creation) happens in Checkout,
    // via /api/paystack/initialize -> Paystack -> /api/paystack/verify.
    setShowCheckout(true);
  };

  // 2. DYNAMIC MAP GENERATOR FUNCTION
  // This builds the full interactive seat matrix array from rows and columns on the fly
  const renderSeatingMatrix = () => {
    const seatsMatrix = [];
    const bookings = eventDetails.seats || [];

    for (let r = 1; r <= eventDetails.rows; r++) {
      const rowLetter = String.fromCharCode(64 + r); // Converts 1 to 'A', 2 to 'B', etc.

      for (let c = 1; c <= eventDetails.seatsPerRow; c++) {
        const currentSeatId = `${rowLetter}${c}`;

        // Look if there's an active status recorded for this specific coordinate inside MongoDB
        const bookingStatusRecord = bookings.find(
          (b) => b.id === currentSeatId,
        );

        // If no booking record is present, the layout falls back safely to 'available'
        const currentStatus = bookingStatusRecord
          ? bookingStatusRecord.status
          : "available";
        const isSelected = selectedSeats.includes(currentSeatId);

        seatsMatrix.push(
          <div
            key={currentSeatId}
            className={`seat ${isSelected ? "selected" : currentStatus}`}
            onClick={() =>
              currentStatus !== "booked" && handleSeatClick(currentSeatId)
            }
          >
            {currentSeatId}
          </div>,
        );
      }
    }
    return seatsMatrix;
  };

  if (!eventDetails) {
    return (
      <div className="booking-container">
        <Navbar />
        <div
          className="loading"
          style={{ textAlign: "center", padding: "100px", color: "#7600c9" }}
        >
          Loading seating layout map...
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <Checkout
        eventId={eventId}
        venueId={eventDetails.venueId}
        selectedSeats={selectedSeats}
      />
    );
  }

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
              gridTemplateColumns: `repeat(${eventDetails.seatsPerRow || 10}, minmax(45px, 1fr))`,
              gap: "6px",
            }}
          >
            {/* 3. Output the combined layout matrix template generation */}
            {renderSeatingMatrix()}
          </div>
        </div>

        <div className="summary-section">
          <h3>Ticket Overview</h3>
          <p className="event-title">
            <strong>Event:</strong>{" "}
            {eventDetails.name || "Special Encounter Show"}
          </p>
          <p>
            Seats Selected: <strong>{selectedSeats.length}</strong>
          </p>

          {selectedSeats.length > 0 && (
            <div
              className="selected-list-preview"
              style={{ margin: "10px 0", fontSize: "14px", color: "#555" }}
            >
              Selected: {selectedSeats.join(", ")}
            </div>
          )}

          <button
            className="checkout-purple-btn"
            onClick={handleProceedToCheckout}
            disabled={selectedSeats.length === 0}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingPage() {
  const { id } = useParams();
  return <SeatSelection eventId={id} />;
}
export default BookingPage;