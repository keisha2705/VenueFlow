import React, { useState, useEffect } from 'react';
import '../Styling/BookingPage.css';

export default function SeatSelection({ eventId = "101" }) { // Pass eventId dynamically as a prop
  const [eventDetails, setEventDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const userId = "user_client_abc123";

  // Fetch data from backend on mount or when eventId changes
  useEffect(() => {
    fetchLayoutData();
  }, [eventId]);

  const fetchLayoutData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/events/${eventId}/seats`);
      const data = await res.json();
      setEventDetails(data);
      
      // Keep selected seats sync state aligned with current cart metrics
      const matchingHolds = data.seats
        .filter(s => s.status === 'locked' && s.lockedBy === userId)
        .map(s => s.id);
      setSelectedSeats(matchingHolds);
    } catch (err) {
      console.error("Layout data sync loss:", err);
    }
  };

  const handleSeatClick = async (seatId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/events/${eventId}/reserve-seat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatId, userId })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        fetchLayoutData(); // Force sync view on collision conflict
        return;
      }

      if (data.action === "locked") {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        setSelectedSeats(selectedSeats.filter(id => id !== seatId));
      }
      
      fetchLayoutData(); // Update status colors across all grid nodes smoothly
    } catch (err) {
      console.error("Communication channel fault:", err);
    }
  };

 

  return (
    <div className="booking-container">
      <div className="card-interface">
        
        <div className="grid-section">
          <h3>Select Your Seats</h3>
          <div className="stage-screen">STAGE / SCREEN</div>
          
          {/* THE FIX: CSS Grid Template Columns directly built from dynamic backend metrics */}
          <div 
            className="seating-grid" 
            style={{ gridTemplateColumns: `repeat(${eventDetails.seatsPerRow}, minmax(30px, 1fr))` }}
          >
            {eventDetails.seats.map(seat => (
              <div
                key={seat.id}
                className={`seat ${seat.status === 'locked' && seat.lockedBy === userId ? 'selected' : seat.status}`}
                onClick={() => handleSeatClick(seat.id)}
              >
                {seat.id}
              </div>
            ))}
          </div>
        </div>

        <div className="summary-section">
          <h3>Ticket Overview</h3>
          <p className="event-title">{eventDetails.eventName}</p>
          {/* Remainder of summary layout calculation engine stays the same */}
        </div>

      </div>
    </div>
  );
}
