import { useEffect } from "react";
import { createPortal } from "react-dom";

import { ModalBackDrop } from "./ModalBackdrop";
import { ModalContent } from "./ModalContent";

export default function Modal({ children, showModal, onClose }) {

    const modalRoot = document.getElementById('modal-root');

    const handleKeyDown = ({ code }) => {
        if (code === 'Escape') onClose();
    };

    const handleBackdropClick = ({ target, currentTarget }) => {
        if (target === currentTarget) onClose();
    };

    useEffect(
        () => {
            window.addEventListener('keydown', handleKeyDown);
        },
        []
    );

    useEffect(
        () => {
            return (
                () => {
                    window.removeEventListener('keydown', handleKeyDown);
                }
            );
        },
        []
    );

    const jsx = (
        <ModalBackDrop onClick={handleBackdropClick} >
            <ModalContent>
                {children}
                <button type="button" onClick={onClose}>Close</button>
            </ModalContent>
        </ModalBackDrop>
    );

    if (showModal) return createPortal(jsx, modalRoot);
};