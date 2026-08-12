import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from "./Pages/AuthPage";
import ProtectedRoute from  "./Components/ProtectedRoutes";
import Manager from "./Pages/Manager";
import PageNotFound from "./Pages/PageNotFound"
import UserDashboard from "./Pages/UserDashboard";
import ForgotPassword from "./Pages/ForgotPassword"
import ManageVenues from "./Pages/ManageVenues";
import Events from "./Pages/Events";
import BookingPage from "./Pages/BookingPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          < Route path="/forgot-password" element = {<ForgotPassword />} />

        <Route path="/user" element={
          <ProtectedRoute roles={["user", "manager"]}>
            <UserDashboard />
            </ProtectedRoute>
        }/>

        <Route path="/events" element={
          <ProtectedRoute roles={["user", "manager"]}>
              <Events />
          </ProtectedRoute>
          }/>

        <Route path="/bookings" element={
          <ProtectedRoute roles={["user", "manager"]}>
            <BookingPage />
            </ProtectedRoute>
        }/>

          <Route path="/manager" element={
            <ProtectedRoute roles={["manager"]}>
              <Manager />
            </ProtectedRoute>
          } />

        <Route path="*" element={<PageNotFound />} />

          <Route path="/manager/venues" element={
            <ProtectedRoute roles={["manager"]}>
             <ManageVenues />
          </ProtectedRoute>
    }
/>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

