import React from "react";
import "./Footer.css";
import firstImg from "../../assets/firstImg.jpeg";
import Footerlogo from "../../assets/Footerlogo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo-social">
          <img src={Footerlogo} alt="LORDS" className="footer-logo" />
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Sign up for our exclusive newsletter</h4>
          <div className="newsletter-form">
            <input type="email" placeholder="Email" />
            <button>SUBMIT</button>
          </div>
          <p>
            By signing up you accept our <a href="#">terms and conditions</a>
          </p>
        </div>
      </div>

      <hr />

      <div className="footer-links">
        <div>
          <h5>WHY LORDS</h5>
          <ul>
            <li>About LORDS</li>
            <li>Founder's Message</li>
            <li>Investor relations</li>
            <li>ESG</li>
            <li>Building Documentation</li>
            <li>Whistleblower line</li>
          </ul>
        </div>
        <div>
          <h5>COMMUNITIES</h5>
          <ul>
            <li>DAMAC Islands</li>
            <li>DAMAC Riverside</li>
            <li>DAMAC Sun City</li>
            <li>DAMAC Lagoons</li>
            <li>DAMAC Hills</li>
            <li>DAMAC Hills 2</li>
          </ul>
        </div>
        <div>
          <h5>POPULAR AREAS</h5>
          <ul>
            <li>Villas for sale in DAMAC Lagoons</li>
            <li>Villas for sale in DAMAC Hills</li>
            <li>Properties for sale in DAMAC Hills 2</li>
            <li>Apartments for sale in Cavalli Tower</li>
          </ul>
        </div>
        <div>
          <h5>FEATURED PROJECTS</h5>
          <ul>
            <li>Chelsea Residences</li>
            <li>Safa Gate</li>
            <li>Volta</li>
            <li>Couture by Cavalli</li>
            <li>Lagoon Views</li>
          </ul>
        </div>
        <div>
          <h5>HOSPITALITY</h5>
          <ul>
            <li>Paramount Hotel Dubai</li>
            <li>Paramount Hotel Midtown</li>
            <li>DAMAC Maison Distinction</li>
            <li>DAMAC Maison Cour Jardin</li>
            <li>DAMAC Maison Canal Views</li>
          </ul>
        </div>
        <div>
          <h5>DAMAC ASSIST</h5>
          <ul>
            <li>Mortgage Calculator</li>
            <li>Mortgage Assist</li>
            <li>Contact Us</li>
            <li>Agents Portal</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="store-badges">
          {/* <img src={firstImg} alt="App Store" />
          <img src={firstImg} alt="Play Store" /> */}
        </div>
        <div className="living-logo">
          {/* <img src={firstImg} alt="DAMAC Living" /> */}
        </div>
        <div className="footer-legal">
          <p>
            © 2025 LORDS Properties. All Rights Reserved (v3.1.0) <br />
            <a href="#">Terms and Conditions</a> |{" "}
            <a href="#">Privacy Policy</a> | <a href="#">Cookie Policy</a> |{" "}
            <a href="#">Corporate Communications Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
