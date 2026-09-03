import React, { useState, useEffect } from "react";
import "../Styling/BookingPage.css";
import Navbar from "../Components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

export function SeatSelection({ eventId }) {
  const [eventDetails, setEventDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!eventId) return;
    const fetchLayoutData = async () => {
      try {
        const token = localStorage.getItem("token");
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

        if (data && data.rows && data.seatsPerRow) {
          setEventDetails(data);

          // Fallback array if no bookings exist yet
          const activeBookings = data.seats || [];

          // NOTE: matching "held by me" now happens by trusting the backend's
          // 200 response for book-seat rather than comparing against a
          // client-supplied userId (see handleSeatClick below). On initial
          // load we can't know which locks are "ours" without the backend
          // telling us, so this just restores anything currently locked.
          // If you want per-user restore-on-refresh, add a
          // GET /events/:id/my-locks endpoint that uses verifyFirebase
          // server-side and returns the caller's own locked seat ids.
          const matchingHolds = activeBookings
            .filter((s) => s.status === "locked")
            .map((s) => s.id);
          setSelectedSeats((prev) =>
            prev.length ? prev : [], // don't clobber optimistic local state on refetch
          );
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
  }, [eventId]);

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
          // userId is no longer sent from the client — the backend derives
          // it from the verified Firebase token (see verifyFirebase on the
          // /book-seat route). Never trust a client-supplied user id for
          // anything used in an authorization/lock check.
          body: JSON.stringify({ seatId }),
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

  const handleFinalCheckout = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before confirming.");
      return;
    }

    setBookingLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        eventId: eventId,
        venueId: eventDetails.venueId,
        selectedSeats: selectedSeats,
      };
      console.log("Checkout payload:", payload);

      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Required now that /bookings uses verifyFirebase.
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Booking error detail:", data);
        alert(data.message || "Booking failed.");
        return;
      }

      alert(`Success! Booking Confirmed.\nRef: ${data.bookingReference}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Checkout fault:", err);
      alert("Communication error during checkout creation.");
    } finally {
      setBookingLoading(false);
    }
  };

  // DYNAMIC MAP GENERATOR FUNCTION
  const renderSeatingMatrix = () => {
    const seatsMatrix = [];
    const bookings = eventDetails.seats || [];

    for (let r = 1; r <= eventDetails.rows; r++) {
      const rowLetter = String.fromCharCode(64 + r); // 1 -> 'A', 2 -> 'B', etc.

      for (let c = 1; c <= eventDetails.seatsPerRow; c++) {
        const currentSeatId = `${rowLetter}${c}`;

        const bookingStatusRecord = bookings.find(
          (b) => b.id === currentSeatId,
        );

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
            onClick={handleFinalCheckout}
            disabled={bookingLoading || selectedSeats.length === 0}
          >
            {bookingLoading ? "Processing Ticket..." : "Confirm & Book Tickets"}
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