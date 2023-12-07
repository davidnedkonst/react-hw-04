import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./ImageModal.module.css";

const ESC_CODE = 'Escape';
const modalRoot = document.getElementById('modal-root');

export default function ImageModal({ show, contentModal, onClose }) {

    const handleClick = ({ target, currentTarget }) => {
        const isClickBackdrop = target === currentTarget;
        if (isClickBackdrop) {
            onClose();
        }
    };

    const handleKeyDown = ({ code }) => {
        const isKeyDownEsc = code === ESC_CODE;
        if (isKeyDownEsc) {
            onClose();
        }
    };

    useEffect(
        () => {
            const { addEventListener, removeEventListener } = window;

            addEventListener('keydown', handleKeyDown);

            return (
                () => {
                    removeEventListener('keydown', handleKeyDown)
                }
            );
        }
    );

    if (show) {
        if (contentModal) {
            const { largeImageURL, tags } = contentModal;
            const jsx = (
                <div
                    className={css.Overlay}
                    onClick={handleClick}
                >
                    <img
                        className={css.Modal}
                        src={largeImageURL}
                        alt={tags}
                    />
                </div>
            );
            return createPortal(jsx, modalRoot);
        }
    }
};