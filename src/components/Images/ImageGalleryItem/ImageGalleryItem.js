import { useState } from "react";
import ImageModal from "../ImageModal";
import css from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ item }) {
    const [selectImage, setSelectImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const onImageClick = selectImage => {
        setSelectImage(selectImage);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectImage(null);
        setShowModal(false);
    };

    return (
        <>
            <div className={css.ImageGalleryItem}>
                <img
                    className={css.ImageGalleryItemImage}
                    src={item.webformatURL}
                    alt={item.tags}
                    onClick={() => { onImageClick(item) }}
                />
            </div>

            <ImageModal
                show={showModal}
                contentModal={selectImage}
                onClose={closeModal}
            />
        </>
    );
};