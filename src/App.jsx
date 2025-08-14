import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import FinalCompatibilityGuide from "./components/FinalCompatibilityGuide";
import ClientDashboard from "./pages/ClientDahboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public / common */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/final-guide"
            element={
              <>
                <FinalCompatibilityGuide />
                <Footer />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <ClientDashboard />
                <Footer />
              </>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/login"
            element={
              <>
                <AdminLogin />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
                <Footer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
