import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ images, handleModalOpen }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          handleModalOpen={() => handleModalOpen(image.id)}
        />
      ))}
    </ul>
  );
};
