import React from 'react';
import '../Styling/Navbar.css';

function Navbar() {
 
  // takes logged in info from local storage and assigns it to the userRole variable. If there's no logged-in user, it defaults to "user".
  const userRole = localStorage.getItem("userRole") || "user";

  return (
     <>
    <nav className="navbar glass">
      {/* Logo */}
      <div className="logo">
        <img src="./logo1.png" alt="Logo" className="logo-image" />
      </div>

      {/* Navigation Options Links */}
      <div className="nav-links">
        <a href="/user">Home</a>
        <a href="/events">All Events</a>
        <a href="/Application">Application Form</a>
        
        
        {/* CONDITIONAL RENDERING BLOCK */}
        {(userRole === "superAdmin" || userRole === "manager") && (
          <a href="/superAdmin">Dashboard</a>
        )}
        
        <a href="/about">About Us</a>
        <a href="/BookingHistory">User Profile</a>
      </div>

      {/* Profile Wrapper Component */}
    
    </nav>
      {/* <div className="profile-button">
        pfp
      </div> */}
    </>
  )
}

export default Navbar;
