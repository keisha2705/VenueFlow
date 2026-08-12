
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from "./Pages/AuthPage";
import ProtectedRoute from  "./Components/ProtectedRoutes";
import Admin from "./Pages/Admin";
import PageNotFound from "./Pages/PageNotFound"
import ForgotPassword from "./Pages/ForgotPassword"
import BookingPage from  "./Pages/BookingPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<AuthPage />} />
          < Route path="/forgot-password" element = {<ForgotPassword />} />

          <Route path="/superadmin" element={
            <ProtectedRoute role="superAdmin">
              <Admin />
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

