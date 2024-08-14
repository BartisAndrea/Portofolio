import React from 'react';
import '../ConfirmationModal/ConfirmationModal.css'; 

const ConfirmationModal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ConfirmationModal;
