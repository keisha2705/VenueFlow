import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebase";
import "../Styling/Navbar.css";

function Navbar() {
  const userRole = localStorage.getItem("userRole");
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  async function getProfile() {
    try {
      const token = await auth.currentUser.getIdToken();
      const uid = auth.currentUser.uid;
      const response = await fetch(`http://localhost:3000/users/${uid}`,
        {
          method: "GET",
          headers: {Authorization: `Bearer ${token}`},
        }
      )
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setProfile(data);
      setShowProfile(true);
    } catch (error) {
      console.error("Error getting profile:", error);
      alert(error.message);
    }
  }

  function closeProfile() {
    setShowProfile(false);
  }

  return (
    <>
      <nav className="navbar glass">
        <div className="logo"><img src="./logo1.png"/></div>
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

export default Navbar