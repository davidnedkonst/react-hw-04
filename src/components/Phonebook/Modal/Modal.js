import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { ModalBackDrop } from "./ModalBackdrop";
import { ModalContent } from "./ModalContent";

const ESC_CODE = 'Escape';
const KEYDOWN_CODE = 'keydown';

export default function Modal({ children, show, onClose }) {

    const modalRoot = useRef(document.getElementById('modal-root'));

    const handleKeyDown = ({ code }) => {
        if (code === ESC_CODE) {
            onClose();
        }
    };

    const handleBackdropClick = ({ target, currentTarget }) => {
        if (target === currentTarget) {
            onClose();
        }
    };

    useEffect(
        () => {
            window.addEventListener(KEYDOWN_CODE, handleKeyDown);

            return (
                () => {
                    window.removeEventListener(KEYDOWN_CODE, handleKeyDown);
                }
            );
        }
    );

    const jsx = (
        <ModalBackDrop onClick={handleBackdropClick} >
            <ModalContent>
                {children}
                <button type="button" onClick={onClose}>Close</button>
            </ModalContent>
        </ModalBackDrop>
    );

    if (show) return createPortal(jsx, modalRoot.current);
};