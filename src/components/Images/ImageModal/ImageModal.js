import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./ImageModal.module.css";

export default function ImageModal({ show, contentModal, onClose }) {
    const modalRoot = document.getElementById('modal-root');

    const handleClick = ({ target, currentTarget }) => {
        const isBackdropClick = target === currentTarget;
        if (isBackdropClick) onClose();
    };

    const handleKeyDown = ({ code }) => {
        const isEscClick = code === 'Escape';
        if (isEscClick) onClose();
    };

    useEffect(
        () => {
            window.addEventListener('keydown', handleKeyDown);
        }, []
    );

    useEffect(
        () => {
            return (
                () => {
                    window.removeEventListener('keydown', handleKeyDown)
                }
            );
        }, []
    );

    if (show) {
        const jsx = (
            <div
                className={css.Overlay}
                onClick={handleClick}
            >
                <img
                    className={css.Modal}
                    src={contentModal.largeImageURL}
                    alt={contentModal.tags}
                />
            </div>
        );
        return createPortal(jsx, modalRoot);
    }
};