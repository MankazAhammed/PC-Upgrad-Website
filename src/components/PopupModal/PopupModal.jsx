import React from "react";
import "./PopupModal.css";

const PopupModal = ({ isOpen, onClose, title, message, type = "info" }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div
        className={`popup-modal ${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose} className="popup-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
