import React from "react";
import "../components/styles/CustomAlert.css";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Uyarı</h2>
        <p>{message}</p>
        <button onClick={onClose}>Tamam</button>
      </div>
    </div>
  );
};

export default CustomAlert;
