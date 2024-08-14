import React from 'react';
import './Modal.css'; // Asigurați-vă că CSS-ul este importat

const Modal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Modal;
