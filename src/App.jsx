import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Manager from "./Pages/Manager";
import PageNotFound from "./Pages/PageNotFound";
import UserDashboard from "./Pages/UserDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import BookingPage from "./Pages/BookingPage";
import ManageVenues from "./Pages/ManageVenues";
import Events from "./Pages/Events";
import AboutUs from "./Pages/AboutUs";
import ManageEvents from "./Pages/ManageEvents";
import BookingHistory from './Pages/BookingHistory'; // Safely imported

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* normal user home page */}
          <Route
            path="/user"
            element={
              <ProtectedRoute roles={["user", "manager"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* this is for normal user */}
          <Route
            path="/events"
            element={
              <ProtectedRoute roles={["user", "manager"]}>
                <Events />
              </ProtectedRoute>
            }
          />
          
          {/* normal user booking for a specific event id */}
          <Route
            path="/bookings/:id"
            element={
              <ProtectedRoute roles={["user", "manager"]}>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          {/* 🛠️ FIXED: Added the missing Booking History route. 
              Protected it so only logged-in users and managers can see it. */}
          <Route
            path="/BookingHistory"
            element={
              <ProtectedRoute roles={["user", "manager"]}>
                <BookingHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager"
            element={
              <ProtectedRoute roles={["manager"]}>
                <Manager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/venues"
            element={
              <ProtectedRoute roles={["manager"]}>
                <ManageVenues />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/manager/events"
            element={
              <ProtectedRoute roles={["manager"]}>
                <ManageEvents />
              </ProtectedRoute>
            }
          />

          {/* <Route path="/superAdmin" element={
            <ProtectedRoute roles={["superAdmin"]}>
             <SuperAdmin />
          </ProtectedRoute>
    }/> */}

          <Route
            path="/about"
            element={
              <ProtectedRoute roles={["user", "manager"]}>
                <AboutUs />
              </ProtectedRoute>
            }
          />

          {/* This wildcard 404 catcher MUST stay at the very bottom of the tree */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
