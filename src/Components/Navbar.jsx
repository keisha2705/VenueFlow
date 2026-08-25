// import React from 'react';
// import '../Styling/Navbar.css';
// import logoImg from '../assets/LOGO.png'; // Import the logo image

// function Navbar() {
//   // takes logged in info from local storage and assigns it to the userRole variable. If there's no logged-in user, it defaults to "user".
//   const userRole = localStorage.getItem("userRole") || "user";

//   return (
//     <nav className="navbar glass">
// {/* 
//       Logo
//       <div className="logo">
//         eshek
//         <img src="../public/LOGO.png" alt="Logo" className="logo-image" />
//       </div> */}

//       {/* Logo */}
//       <div className="logo">
//         <img src="/LOGO.png" alt="Logo" className="logo-image" />
//       </div>


//       {/* Navigation Options Links */}
//       <div className="nav-links">
//         <a href="/user">Home</a>
//         <a href="/events">All Events</a>
//         <a href="/coming-soon">Coming Soon</a>
//         <a href="/application">Application Form</a>
//         <a href="/BookingHistory">Booking History</a>
//         {/*  CONDITIONAL RENDERING BLOCK */}
//         {(userRole === "superAdmin" || userRole === "manager") && (
//           <a href="/">Dashboard</a>
//         )}
        
//         <a href="/about">About Us</a>
//         <a href="booking">BookingPage</a>
//       </div>

//       {/* Profile */}
//       <div className="profile-button">
//         pfp
//       </div>

//     </nav>
//   );
// }

// export default Navbar;


import React from 'react';
import '../Styling/Navbar.css';

function Navbar() {
  // takes logged in info from local storage and assigns it to the userRole variable. If there's no logged-in user, it defaults to "user".
  const userRole = localStorage.getItem("userRole") || "user";

  return (
    <nav className="navbar glass">
      {/* Logo */}
      <div className="logo">
        <img src="/LOGO.png" alt="Logo" className="logo-image" />
      </div>

      {/* Navigation Options Links */}
      <div className="nav-links">
        <a href="/user">Home</a>
        <a href="/events">All Events</a>
        <a href="/coming-soon">Coming Soon</a>
        <a href="/Application">Application Form</a>
        <a href="/BookingHistory">Booking History</a>
        
        {/* CONDITIONAL RENDERING BLOCK */}
        {(userRole === "superAdmin" || userRole === "manager") && (
          <a href="/superAdmin">Dashboard</a>
        )}
        
        <a href="/about">About Us</a>
        <a href="/bookings/active">BookingPage</a>
      </div>

      {/* Profile Wrapper Component */}
      <div className="profile-button">
        pfp
      </div>
    </nav>
  );
}

export default Navbar;
