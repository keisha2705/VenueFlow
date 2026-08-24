import React, { useState, useEffect } from "react";
import "../Styling/BookingPage.css";
import Navbar from "../Components/Navbar";
import { useParams, useNavigate } from "react-router-dom"; 

export function SeatSelection({ eventId }) {
  const [eventDetails, setEventDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();
  
  // Static placeholder user string matching your setup
  // const userId = "user_client_abc123"; 

   useEffect(() => {
    if (!eventId) return
    const fetchLayoutData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await fetch(`http://localhost:3000/events/${eventId}/seats`,{headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json"}});
        const data = await res.json();
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
  }, [eventId, selectedSeats.length]);

  const handleSeatClick = async (seatId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}/book-seat`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ seatId, userId }),}
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

  // a trigger hitting your updated POST /bookings endpoint
  const handleFinalCheckout = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before confirming.");
      return;
    }

    setBookingLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Sends your validation token to backend
        },
        body: JSON.stringify({
          eventId: eventId,
          venueId: eventDetails.venueId || "6a7cfcfc98dc2233aa112233", // Ensure backend returns venueId or fallback
          selectedSeats: selectedSeats
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Booking failed.");
        return;
      }

      alert(`Success! Booking Confirmed.\nRef: ${data.bookingReference}`);
      navigate("/dashboard"); // Redirect home after successful checkout

    } catch (err) {
      console.error("Checkout fault:", err);
      alert("Communication error during checkout creation.");
    } finally {
      setBookingLoading(false);
    }
  };

  //  Stops application from breaking when data is fetching on mount
  if (!eventDetails) {
    return (
      <div className="booking-container">
        <Navbar />
        <div className="loading" style={{ textAlign: "center", padding: "100px", color: "#7600c9" }}>
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
              gridTemplateColumns: `repeat(${eventDetails.seatsPerRow || 10}, minmax(30px, 1fr))`,
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
          <p>Seats Selected: <strong>{selectedSeats.length}</strong></p>
          
          {/* Added the actionable checkout button element row here */}
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
export default BookingPage
