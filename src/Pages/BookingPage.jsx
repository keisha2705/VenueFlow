import React, { useState, useEffect } from "react";
import "../Styling/BookingPage.css";
import Navbar from "../Components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

export function SeatSelection({ eventId }) {
  const [eventDetails, setEventDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
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

  // Hands off to the payment step instead of booking directly — the
  // booking is only created after Paystack confirms payment, inside
  // /api/paystack/verify on the backend.
  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before continuing.");
      return;
    }

    const pricePerSeat = eventDetails.ticketPrice || 0;
    const totalPrice = pricePerSeat * selectedSeats.length;

    navigate("/checkout", {
      state: {
        eventId,
        venueId: eventDetails.venueId,
        selectedSeats,
        eventName: eventDetails.name,
        price: totalPrice,
      },
    });
  };

  const renderSeatingMatrix = () => {
    const seatsMatrix = [];
    const bookings = eventDetails.seats || [];

    for (let r = 1; r <= eventDetails.rows; r++) {
      const rowLetter = String.fromCharCode(64 + r);

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