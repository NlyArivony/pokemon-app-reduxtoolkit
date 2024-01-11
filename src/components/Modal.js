import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ children, isOpen, onClose }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();  // 27 is the key code for Esc
        };

        window.addEventListener('keydown', handleEsc);

        // Clean up the event listener
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    );
};



export default Modal;