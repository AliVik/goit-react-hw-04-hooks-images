import ImageGalleryItem from "../ImageGalleryItem";
import css from "./ImageGallery.module.css";
import PropTypes from "prop-types";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.Gallery}>
      {images.map((image) => {
        const { id, largeImageURL, webformatURL } = image;
        return (
          <ImageGalleryItem
            key={id}
            largeImageURL={largeImageURL}
            webformatURL={webformatURL}
            onImageClick={onImageClick}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
};
