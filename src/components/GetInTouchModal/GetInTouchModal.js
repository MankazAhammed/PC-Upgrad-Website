import React from "react";
import "./GetInTouchModal.css";

export default function GetInTouchModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>GET IN TOUCH</h2>
        <p>Provide your contact details for a callback</p>

        <form className="form-grid">
          <div className="form-group">
            <label>First name*</label>
            <input type="text" placeholder="First name" />
          </div>
          <div className="form-group">
            <label>Last name*</label>
            <input type="text" placeholder="Last name" />
          </div>
          <div className="form-group full">
            <label>Email*</label>
            <input type="email" placeholder="Email address" />
          </div>
          <div className="form-group full">
            <label>Phone*</label>
            <div className="phone-input">
              <select>
                <option>🇦🇪 +971</option>
                <option>🇮🇳 +91</option>
                <option>🇮🇪 +353</option>
              </select>
              <input type="tel" placeholder="Phone number" />
            </div>
          </div>
          <button type="submit" className="submit-btn">SUBMIT</button>
        </form>

        <small>
          By sending this email I agree to the{" "}
          <a href="#">Terms and Conditions</a> and{" "}
          <a href="#">Privacy Policy</a>
        </small>
      </div>
    </div>
  );
}
