import ImageGalleryItem from "../ImageGalleryItem";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ show, image, onImageClick }) {

    if (show)
        return (
            <div className={css.ImageGallery} >{
                image.map((item, id) =>
                    <ImageGalleryItem
                        key={id}
                        item={item}
                        onImageClick={onImageClick}
                    />
                )
            }</div>
        );
};