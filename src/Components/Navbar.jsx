// import React from 'react';
// import '../Styling/Navbar.css';

// function Navbar() {
//   return (
//     <nav className="navbar glass">

//       {/* Logo */}
//       <div className="logo">
//         eshek
//       </div>

    
//       <div className="nav-links">
//         <a href="/user">Home</a>
//         <a href="/events">All Events</a>
//         <a href="/coming-soon">Coming Soon</a>
//         <a href="/application">Application Form</a>
//         <a href="/">Dashboard</a>
//         <a href="/about">About Us</a>
//         <a href="booking">BookingPage</a>
//       </div>

//       {/* Profile */}
//       <div className="profile-button">
//        pfp
//       </div>

//     </nav>
//   );
// }

// export default Navbar;


import React from 'react';
import '../Styling/Navbar.css';

function Navbar() {
  const userRole = localStorage.getItem("userRole") || "user";

  return (
    <nav className="navbar glass">

      {/* Logo */}
      <div className="logo">
        eshek
      </div>

      {/* Navigation Options Links */}
      <div className="nav-links">
        <a href="/user">Home</a>
        <a href="/events">All Events</a>
        <a href="/coming-soon">Coming Soon</a>
        <a href="/application">Application Form</a>
        
        {(userRole === "superAdmin" || userRole === "manager") && (
          <a href="/">Dashboard</a>
        )}
        
        <a href="/about">About Us</a>
        <a href="booking">BookingPage</a>
      </div>

      {/* Profile */}
      <div className="profile-button">
        pfp
      </div>

    </nav>
  );
}

export default Navbar;
