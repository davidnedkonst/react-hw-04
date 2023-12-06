import css from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ item, onImageClick }) {
    const { webformatURL, tags } = item;

    return (
        <div className={css.ImageGalleryItem}>
            <img
                className={css.ImageGalleryItemImage}
                src={webformatURL}
                alt={tags}
                onClick={() => { onImageClick(item) }}
            />
        </div>
    );
};