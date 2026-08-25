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
// import Events from "./Pages/Events";
import AboutUs from './Pages/AboutUs';
import ManageEvents from "./Pages/ManageEvents"
import SuperAdmin from './Pages/SuperAdmin';
import AvailableVenues from "./Pages/AvailableVenus";
import ApplicationForm from './Pages/ApplicationForm';
// import emailjs from "./pages/@emailjs/browser";


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
          
          <Route
            path="/events"
            element={
              <ProtectedRoute roles={["user", "manager"]}>
                <AvailableVenues/>
              </ProtectedRoute>
            }
          /> 
          {/* normal user booking for an event */}
          <Route
            path="/bookings/:id"
            element={
              <ProtectedRoute roles={["user", "manager"]}>
                <BookingPage />
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

          <Route path="*" element={<PageNotFound />} />

          <Route path="/manager/venues" element={
            <ProtectedRoute roles={["manager"]}>
             <ManageVenues />
          </ProtectedRoute>
    }/>  
        <Route path="/manager/events" element={
        <ProtectedRoute roles={["manager"]}>
          <ManageEvents />
        </ProtectedRoute>
    }/>
          <Route path="/superAdmin" element={
            <ProtectedRoute roles={["superAdmin"]}>
             <SuperAdmin />
          </ProtectedRoute>
    }/>

          <Route
            path="/About"
            element={
              <ProtectedRoute roles={["user", "manager"]}>
                <AboutUs />
              </ProtectedRoute>
            }
          />

           <Route
            path="/Application"
            element={
              <ProtectedRoute roles={["user"]}>
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
