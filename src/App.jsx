// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from "./Pages/AuthPage";
import ProtectedRoute from  "./Components/ProtectedRoutes";
// import PageNotFound from "./Pages/PageNotFound";
// import LOGO from  './public/LOGO.png'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

