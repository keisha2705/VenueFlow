import React, { useState, useEffect } from 'react';
import '../Styling/BookingHistory.css';
import Navbar from "../Components/Navbar.jsx";

function BookingHistory() {
  const [bookingHistory, setBookingHistory] = useState([]);

  const getLocalUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  };

  const userData = getLocalUser();

  const userProfile = {
    name: userData?.username || "Loading name...",
    email: userData?.email || "Loading email..."
  };


  // 3. Connect to the backend the moment the page opens on the screen
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        // Read the logged-in user's unique identification key from memory
        const userUid = localStorage.getItem("userUid") || "HC1gB96RppUzsMIzpSYpA2IhiQS2";

        // send a get request to the backend route
        const response = await fetch("http://localhost:3000/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-mock-uid": userUid 
          }
        });

        const data = await response.json();
        
        // If the data is a valid list, update our page memory
        if (Array.isArray(data)) {
          setBookingHistory(data);
        }
      } catch (error) {
        console.error("Database connection error:", error);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <div className="history-page-container" style={{ padding: '100px 30px 30px 30px', color: '#141414', background: '#d6d6e4', minHeight: '100vh' }}>
      <Navbar/>
      <div className="user-profile-header" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
        <div className="user-icon" style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#691362', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
        </div>
        <div className="user-metadata">
          <h2 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>{userProfile.name}</h2>
          <p style={{ margin: '0', color: '#0a0a0a', fontSize: '14px' }}>{userProfile.email}</p>
        </div>
      </div>

      <div className="history-body">
        <h1 style={{ fontSize: '28px', marginBottom: '20px', borderBottom: '1px solid #29292e', paddingBottom: '10px' }}>
          Booking History
        </h1>

        {/*  CONDITIONAL RENDERING FALLBACK */}
        {bookingHistory.length === 0 ? (
          <div style={{ padding: '40px 0', color: '#161515', fontSize: '16px', fontStyle: 'italic' }}>
            You have not yet booked an event.
          </div>
        ) : (
          
          <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {bookingHistory.map((booking, index) => (
              <div key={index} className="booking-card" style={{ background: '#202024', borderRadius: '8px', padding: '20px', border: '1px solid #29292e' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ fontSize: '12px', color: '#ff4d4d', fontWeight: 'bold' }}>{booking.bookingReference}</span>
                  <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '4px', background: '#12a454' }}>
                    {booking.bookingStatus}
                  </span>
                </div>
  
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{booking.event}</h3>
                <p style={{ margin: '0 0 15px 0', color: '#141414', fontSize: '14px' }}>{booking.venue}</p>

                <div style={{ borderTop: '1px solid #29292e', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#aaa' }}>Seats: {booking.selectedSeats?.length || 0}</span>
                  <span style={{ fontWeight: 'bold' }}>Total: R{booking.totalAmount}</span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default BookingHistory;
