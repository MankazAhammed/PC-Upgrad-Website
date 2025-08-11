import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          PCUpgradeGuide
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li></li>
          <li>
            <Link to="/final-guide">Final Guide</Link>
          </li>
          <li>
            <Link to="/compatibility-check">Compatibility Check</Link>
          </li>
          <li>
            <Link to="/mock-tool">Mock Tool</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
