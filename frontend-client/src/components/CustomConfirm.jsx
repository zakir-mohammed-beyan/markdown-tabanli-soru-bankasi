import React from "react";
import "../components/styles/CustomConfirm.css";

const CustomConfirm = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Onayla</h2>
        <p>{message}</p>
        <div className="buttons">
          <button onClick={onConfirm}>Evet</button>
          <button onClick={onCancel}>Hayır</button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirm;
