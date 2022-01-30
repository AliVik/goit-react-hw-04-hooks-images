import css from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  onImageClick,
}) {
  return (
    <li key={id} className={css.GalleryItem}>
      <img
        src={webformatURL}
        alt=""
        className={css.GalleryImage}
        onClick={() => onImageClick(largeImageURL)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onImageClick: PropTypes.func,
};
