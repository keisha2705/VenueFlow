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
import Events from "./Pages/Events";// FIX: Ensured Events is cleanly active for user navigation
import AboutUs from './Pages/AboutUs';
import ManageEvents from "./Pages/ManageEvents";
import SuperAdmin from './Pages/SuperAdmin';
import AvailableVenues from "./Pages/AvailableVenus";
import ApplicationForm from './Pages/ApplicationForm';
import BookingHistory from './Pages/BookingHistory';

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
              <ProtectedRoute roles={["user", "manager", "superAdmin"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/events"
            element={
              <ProtectedRoute roles={["user", "manager", "superAdmin"]}>
                <AvailableVenues/>
              </ProtectedRoute>
            }
          />
          
          {/* normal user booking for a specific event id */}
          <Route
            path="/bookings/:id"
            element={
              <ProtectedRoute roles={["user", "manager","superAdmin"]}>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/BookingHistory"
            element={
              <ProtectedRoute roles={["user", "manager", "superAdmin"]}>
                <BookingHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager"
            element={
              <ProtectedRoute roles={["manager","superAdmin"]}>
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

          <Route path="/manager/venues" element={
            <ProtectedRoute roles={["manager", "superAdmin"]}>
             <ManageVenues />
          </ProtectedRoute>
    }/>  
        <Route path="/manager/events" element={
        <ProtectedRoute roles={["manager", "superAdmin"]}>
          <ManageEvents />
        </ProtectedRoute>
    }/>
          <Route path="/superAdmin" element={
            <ProtectedRoute roles={["superAdmin"]}>
             <SuperAdmin />
          </ProtectedRoute>
    }/>

          <Route
            path="/about"
            element={
              <ProtectedRoute roles={["user", "manager", "superAdmin"]}>
                <AboutUs />
              </ProtectedRoute>
            }
          />
           <Route
            path="/Application"
            element={
              <ProtectedRoute roles={["user", "superAdmin", "manager"]}>
                <ApplicationForm />
              </ProtectedRoute>
            }
          />
          </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;

