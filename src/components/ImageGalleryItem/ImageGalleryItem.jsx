import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, handleModalOpen }) => {
  return (
    <li
      key={image.id}
      className={styles.GalleryItem}
      onClick={() => handleModalOpen(image.id)}
    >
      <img src={image.webformatURL} alt={image.tag} />
    </li>
  );
};
