import React from 'react';
import '../Styling/Navbar.css';

function Navbar() {
 
  // takes logged in info from local storage and assigns it to the userRole variable. If there's no logged-in user, it defaults to "user".
  const userRole = localStorage.getItem("userRole") || "user";

  return (
    <>
      <nav className="navbar glass">
        <div className="logopic"><img src="./logo1.png" alt="Logo" className="logo-image" /></div>
        <div className="nav-links">
          <Link to="/user">Home</Link>
          <Link to="/events">All Events</Link>
          <Link to="/application">Application Form</Link>
          <Link to="/BookingHistory">Booking History</Link>
          {userRole === "manager" && (<Link to="/manager">Manage</Link>)}
          {userRole === "superAdmin" && (<Link to="/superAdmin">Admin</Link>)}
          <Link to="/about">About Us</Link>
        </div>
        <button type="button" className="profile-button" onClick={getProfile} title="View Profile"><img src="./Profile.webp" alt="Profile" className="profile-icon" width="40"/></button>
      </nav>

      {showProfile && profile && (
        <div className="modal-overlay" onClick={closeProfile}>
          <div className="profile-modal" onClick={(event) => event.stopPropagation()}>
            <div><img src="./Profile.webp" alt="Profile" className="profile-icon" width="40"/></div>
            <h2>My Profile ^_^</h2>
            <div className="profile-info">
              <div className="profile-row">
                <b>Name:</b>
                <span>{profile.username || "Not provided"}</span>
              </div>

              <div className="profile-row">
                <b>Email:</b>
                <span>{profile.email || "Not provided"}</span>
              </div>

              <div className="profile-row">
                <b>Role:</b>
                <span className="profile-role">{profile.role || "User"}</span>
              </div>
            </div>

            <button type="button" className="cancel" onClick={closeProfile}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar;
