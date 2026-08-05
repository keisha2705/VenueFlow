// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from "./Pages/AuthPage";
// import ProtectedRoute from  "./Components/ProtectedRoutes";
// import Admin from "./Pages/Admin";
// import PageNotFound from "./Pages/PageNotFound";

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

