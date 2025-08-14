import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} PCUpgradeGuide. All rights reserved.
        <a href="/about"> About</a> |<a href="/contact"> Contact</a>
      </p>
    </footer>
  );
};

export default Footer;
