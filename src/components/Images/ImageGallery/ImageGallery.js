import ImageGalleryItem from "../ImageGalleryItem";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ show, image }) {

    if (show)
        return (
            <div className={css.ImageGallery} >{
                image.map((item, id) =>
                    <ImageGalleryItem
                        key={id}
                        item={item}
                    />
                )
            }</div>
        );
};