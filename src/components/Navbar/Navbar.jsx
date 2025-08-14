import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../auth/AuthContext";

const Navbar = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          PCUpgradeGuide
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/final-guide" onClick={() => setMenuOpen(false)}>
              Compatibility Check
            </Link>
          </li>

          {!isAdmin ? (
            <li>
              <Link to="/admin/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                  Admin
                </Link>
              </li>
              <li>
                <button
                  className="linklike"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
