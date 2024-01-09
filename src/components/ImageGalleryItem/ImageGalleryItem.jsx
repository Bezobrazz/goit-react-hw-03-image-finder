import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image }) => {
  return (
    <li key={image.id} className={styles.GalleryItem}>
      <img src={image.webformatURL} alt={image.tag} />
    </li>
  );
};
