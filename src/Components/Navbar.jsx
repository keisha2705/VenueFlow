import React from 'react';
import '../Styling/Navbar.css';

function Navbar() {
  // takes logged in info from local storage and assigns it to the userRole variable. If there's no logged-in user, it defaults to "user".
  const userRole = localStorage.getItem("userRole") || "user";

  return (
    <nav className="navbar glass">
      <div className="logo"><img src="/assets/LOGO.png"/></div>

      <div className="nav-links">
        <a href="/user">Home</a>
        <a href="/events">All Events</a>
        {/* <a href="/coming-soon">Coming Soon</a> */}
        <a href="/application">Application Form</a>
        <a href="/BookingHistory">Booking History</a>
        {/*  CONDITIONAL RENDERING BLOCK */}
        {(userRole === "superAdmin" || userRole === "manager") && (
          <a href="/">Dashboard</a>
        )}
        
        <a href="/about">About Us</a>
        <a href="/booking">Booking Page</a>
      </div>
    </nav>
  )
}

export default Navbar
