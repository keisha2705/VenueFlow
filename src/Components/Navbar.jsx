import React from 'react';
import '../Styling/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="logo"><img src="./LOGO.png"/></div>

      <div className="nav-links">
        <a href="/user">Home</a>
        <a href="/events">All Events</a>
        {/* <a href="/coming-soon">Coming Soon</a> */}
        <a href="/application">Application Form</a>
        <a href="/">Dashboard</a>
        <a href="/about">About Us</a>
        <a href="booking">Booking Page</a>
      </div>
    </nav>
  )
}

export default Navbar