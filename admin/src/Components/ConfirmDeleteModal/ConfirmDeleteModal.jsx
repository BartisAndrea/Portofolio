import React from 'react';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>{message}</h2>
                <div className="modal-actions">
                    <button className="modal-confirm-button" onClick={onConfirm}>Da</button>
                    <button className="modal-cancel-button" onClick={onCancel}>Nu</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
