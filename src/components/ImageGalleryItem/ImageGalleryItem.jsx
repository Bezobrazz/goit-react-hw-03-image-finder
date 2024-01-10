import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, handleModalOpen }) => {
  return (
    <li key={image.id} className={styles.GalleryItem} onClick={handleModalOpen}>
      <img src={image.urls.small} alt={image.alt_description} />
    </li>
  );
};
