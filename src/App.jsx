
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from "./Pages/AuthPage";
import ProtectedRoute from  "./Components/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/protected" element={
            <ProtectedRoute role="admin">
              <div>This is where the protected page will go</div>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

