import React from 'react';
import '../Styling/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar glass">

      {/* Logo */}
      <div className="logo">
        ♡
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/events">All Events</a>
        <a href="/coming-soon">Coming Soon</a>
        <a href="/application">Application Form</a>
        <a href="/user">Dashboard</a>
        <a href="/about">About Us</a>
      </div>

      {/* Profile */}
      <div className="profile-button">
        <div className="profile-head"></div>
        <div className="profile-body"></div>
      </div>

    </nav>
  );
}

export default Navbar;