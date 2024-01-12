import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <li
      key={image.id}
      className={styles.GalleryItem}
      onClick={() => openModal(image.urls.full)}
    >
      <img src={image.urls.small} alt={image.alt_description} />
    </li>
  );
};
