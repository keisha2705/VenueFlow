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
import AboutUs from "./Pages/AboutUs";
import ManageEvents from "./Pages/ManageEvents";
import BookingHistory from './Pages/BookingHistory';
// import Events from "./Pages/Events";
import SuperAdmin from './Pages/SuperAdmin';
import AvailableVenues from "./Pages/AvailableVenus";
import ApplicationForm from './Pages/ApplicationForm';
// import emailjs from "./pages/@emailjs/browser";
import Checkout from "./Pages/Checkout";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} 
          />
          

          <Route
            path="/events"
            element={
              <ProtectedRoute roles={["user", "manager", "superAdmin"]}>
                <AvailableVenues/>
              </ProtectedRoute>
            }
          /> 
          <Route
            path="/user"
            element={
              <ProtectedRoute roles={["user", "manager", "superAdmin"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          
          
          {/* normal user booking for an event */}
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

          <Route path="*" element={<PageNotFound />} />

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

          <Route path="/about" element={
            <ProtectedRoute roles={["user", "manager", "superAdmin"]}>
              <AboutUs />
            </ProtectedRoute>
            }
          />
           <Route path="/Application" element={
            <ProtectedRoute roles={["user", "superAdmin", "manager"]}>
              <ApplicationForm />
            </ProtectedRoute>
            }
          />
          <Route path="/Checkout" element={
            <ProtectedRoute roles={["user", "superAdmin", "manager"]}>
              <Checkout />
            </ProtectedRoute>
          }
          />
</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
